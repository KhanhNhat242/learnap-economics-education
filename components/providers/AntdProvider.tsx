'use client'

import { ConfigProvider } from 'antd'
import type { ReactNode } from 'react'

/** Theme antd dùng cùng token với app/globals.css */
export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#0f172a',
          colorLink: '#0f172a',
          colorText: '#0f172a',
          colorTextPlaceholder: '#94a3b8',
          colorBorder: '#e2e8f0',
          colorError: '#dc2626',
          fontFamily: 'var(--font-jakarta), ui-sans-serif, system-ui, sans-serif',
          fontSize: 15,
          borderRadius: 12,
          controlHeight: 46,
        },
        components: {
          Form: { labelColor: '#334155', labelFontSize: 14, verticalLabelPadding: '0 0 6px' },
          Select: { optionSelectedBg: '#fefce8', optionSelectedColor: '#0f172a' },
          Modal: { borderRadiusLG: 20 },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
