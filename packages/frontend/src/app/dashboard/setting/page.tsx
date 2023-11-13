import { OptionListItem, OptionListRoot } from '@/components/radix-ui-lib';

export default function AdminSettingPage() {
  return (
    <>
          <OptionListItem
      schema={{
        key: 'port',
        label: '端口',
        description: '设置端口',
        items: [
          {
            key: 'frontend',
            type: 'input',
            label: '前端端口',
            description: '设置前端端口',
          },
          {
            key: 'backend',
            type: 'input',
            label: '后端端口',
            description: '设置后端端口',
          },
          {
            key: '1',
            label: '原神人口普查',
            items: [
              {
                key: 'frontend',
                type: 'switch',
                label: '你氪金了没',
                description: '设置前端端口',
              },
              {
                key: 'backend',
                type: 'select',
                selectOptions: ['1', '2', '3'],
                label: '有几个五星',
                description: '设置后端端口',
              },
            ]
          }
        ],
      }}
    />
    <OptionListItem schema={{
      key: '2',
      type: 'multi-input',
      label: '多输入',
      description: '设置多输入',
      keys: ['1', '2', '3'],
    }} />
    </>
  );
}
