export class TextDecoderStreamPolyfill {
  private readonly decoder: TextDecoder;
  private readonly transformStream: TransformStream<Uint8Array, string>;

  constructor(encoding = "utf-8", options?: TextDecoderOptions) {
    this.decoder = new TextDecoder(encoding, options);
    this.transformStream = new TransformStream<Uint8Array, string>({
      transform: async (chunk, controller) => {
        try {
          const decoded = this.decoder.decode(chunk, { stream: true });
          controller.enqueue(decoded);
        } catch (error) {
          controller.error(error);
        }
      },
      flush: (controller) => {
        try {
          const decoded = this.decoder.decode(undefined, { stream: false });
          if (decoded) {
            controller.enqueue(decoded);
          }
        } catch (error) {
          controller.error(error);
        }
      },
    });
  }

  get readable(): ReadableStream<string> {
    return this.transformStream.readable;
  }

  get writable(): WritableStream<Uint8Array> {
    return this.transformStream.writable;
  }
}
