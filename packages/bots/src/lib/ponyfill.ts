export class TextDecoderStreamPonyfill {
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

export class TextEncoderStreamPonyfill {
  private readonly encoder: TextEncoder;
  private readonly transformStream: TransformStream<string, Uint8Array>;

  constructor() {
    this.encoder = new TextEncoder();
    this.transformStream = new TransformStream<string, Uint8Array>({
      transform: async (chunk, controller) => {
        try {
          const encoded = this.encoder.encode(chunk);
          controller.enqueue(encoded);
        } catch (error) {
          controller.error(error);
        }
      },
      // No need to handle flush in TextEncoderStream, as there's no state kept between encoding calls
    });
  }

  get readable(): ReadableStream<Uint8Array> {
    return this.transformStream.readable;
  }

  get writable(): WritableStream<string> {
    return this.transformStream.writable;
  }
}
