import { OptionListItem, OptionListRoot } from '@/components/radix-ui-lib';

export default function AdminSettingPage() {
  return (
    <OptionListItem
      schema={{
        key: 'port',
        label: '端口',
        items: [
          {
            key: 'frontend',
            type: 'input',
            label: '前端端口',
          },
          {
            key: 'backend',
            type: 'input',
            label: '后端端口',
          },
        ],
      }}
    />
  );
}
