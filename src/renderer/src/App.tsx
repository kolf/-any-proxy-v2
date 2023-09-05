/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-15 13:05:28
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 20:34:54
 * @FilePath: /any-proxy/src/renderer/src/App.tsx
 * @Description:
 */
import { ConfigProvider, theme } from 'antd'
import { AppLayout } from './components/app-layout'

function App(): JSX.Element {
  const {
    token: { colorPrimary }
  } = theme.useToken()
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
          borderRadius: 3
        },
        components: {
          Table: {
            lineHeight: 1
          },
          Menu: {
            colorItemBgSelected: colorPrimary,
            colorItemTextSelected: '#fff'
          }
        }
      }}
    >
      <AppLayout />
    </ConfigProvider>
  )
}

export default App
