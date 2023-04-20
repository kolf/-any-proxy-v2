/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 11:59:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 21:10:44
 * @FilePath: /any-proxy/src/renderer/src/components/Details.tsx
 * @Description:
 */
import { Tabs } from 'antd'

const Group = ({ title, children }) => {
  return (
    <div className="details-group">
      <div className="details-title">{title}</div>
      {children}
    </div>
  )
}

const Item = ({ label, children }) => {
  return (
    <div className="details-item">
      <label className="details-item__label">{label}: </label>
      {children}
    </div>
  )
}

// accept-ranges: bytes
// content-length: 116
// content-md5: uvlgEqkJ8BxCnvC46cPkhw==
// content-type: application/javascript
// date: Sun, 16 Apr 2023 05:05:13 GMT
// etag: "0x8DB3E11FEB74B98"
// last-modified: Sun, 16 Apr 2023 00:32:01 GMT
// x-azure-ref: 0CoI7ZAAAAABbyoqKrsf0SIL1nKXOVezyVFlPMDFFREdFMjMxMQA0ZjExOGU3NS00OGNkLTRmYzEtOWQzMy0wNDdkYzlmYTJjNzA=
// x-cache: CONFIG_NOCACHE
// x-ms-request-id: 36f549fa-901e-00ac-2521-700d1f000000
// x-ms-version: 2018-03-28

export const Details = () => {
  const items = [
    {
      label: 'Request',
      key: '1',
      children: (
        <div>
          <Group title="General">
            <Item label="Method">CONNECT</Item>
            <Item label="URL">https://www.electronjs.org/zh/assets/js/8894.b9281f17.js</Item>
            <Item label="Protocol">HTTP/1.1</Item>
            <Item label="Method">CONNECT</Item>
          </Group>
          <Group title="Headers">
            <Item label="accept-ranges">CONNECT</Item>
            <Item label="x-cache">CONNECT</Item>
            <Item label="x-azure-ref">//alive.github.com</Item>
            <Item label="x-ms-request-id">HTTP/1.1</Item>
            <Item label="x-ms-version">CONNECT</Item>
            <Item label="x-ms-version">CONNECT</Item>
            <Item label="x-ms-version">CONNECT</Item>
            <Item label="x-ms-version">CONNECT</Item>
            <Item label="x-ms-version">CONNECT</Item>
          </Group>
          <Group title="Cookies">
            <Item label="accept-ranges">CONNECT</Item>
            <Item label="x-cache">CONNECT</Item>
            <Item label="x-azure-ref">//alive.github.com</Item>
            <Item label="x-ms-request-id">HTTP/1.1</Item>
            <Item label="x-ms-version">CONNECT</Item>
            <Item label="accept-ranges">CONNECT</Item>
            <Item label="x-cache">CONNECT</Item>
            <Item label="x-azure-ref">//alive.github.com</Item>
            <Item label="x-ms-request-id">HTTP/1.1</Item>
            <Item label="x-ms-version">CONNECT</Item>
          </Group>
          <Group title="Body">
            <Item label="accept-ranges">CONNECT</Item>
            <Item label="x-cache">CONNECT</Item>
            <Item label="x-azure-ref">//alive.github.com</Item>
            <Item label="x-ms-request-id">HTTP/1.1</Item>
            <Item label="x-ms-version">CONNECT</Item>
          </Group>
        </div>
      )
    },
    {
      label: 'Response',
      key: '2',
      children: (
        <div>
          <Group title="General">
            <Item label="Method">CONNECT</Item>
            <Item label="URL">https://www.electronjs.org/zh/assets/js/8894.b9281f17.js</Item>
            <Item label="Protocol">HTTP/1.1</Item>
            <Item label="Method">CONNECT</Item>
          </Group>
          <Group title="Headers">
            <Item label="accept-ranges">CONNECT</Item>
            <Item label="x-cache">CONNECT</Item>
            <Item label="x-azure-ref">//alive.github.com</Item>
            <Item label="x-ms-request-id">HTTP/1.1</Item>
            <Item label="x-ms-version">CONNECT</Item>
          </Group>
        </div>
      )
    }
  ]

  return <Tabs defaultActiveKey="1" centered items={items} />
}
