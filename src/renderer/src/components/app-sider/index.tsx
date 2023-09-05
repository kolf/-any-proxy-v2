/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 11:59:47
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 21:10:44
 * @FilePath: /any-proxy/src/renderer/src/components/Details.tsx
 * @Description:
 */
import { Empty, Layout, Segmented } from 'antd'
const { Content } = Layout
import * as React from 'react'
import styles from './index.module.less'
import { parseCookies } from '../../utils'
const Group = ({ title, children }) => {
  console.log(children, 'children')
  return (
    <div className="details-group">
      <div className="details-title">{title}</div>
      {children ? (
        <div style={{ padding: '12px' }}>{children}</div>
      ) : (
        <div style={{ padding: '24px 48px', textAlign: 'center' }}>No data</div>
      )}
    </div>
  )
}

const Item = ({ label, children }) => {
  if (!label) {
    return null
  }
  return (
    <div className="details-item">
      <label className="details-item__label">{label}: </label>
      <div className={'details-item__value'}>{children}</div>
    </div>
  )
}

interface Props {
  dataSource: any
}

type TabType = 'Request' | 'Response'

const tabs: TabType[] = ['Request', 'Response']

const RequestList = (props) => {
  const { dataSource = {} } = props

  const cookies = parseCookies(dataSource.reqHeader?.Cookie)
  const bodys = dataSource.reqBody ? JSON.parse(dataSource.reqBody) : null
  return (
    <>
      <Group title="General">
        {dataSource.method && (
          <>
            <Item label="Method">{dataSource.method}</Item>
            <Item label="URL">{dataSource.url}</Item>
            <Item label="Protocol">{dataSource.protocol}</Item>
            <Item label="Method">{dataSource.method}</Item>
          </>
        )}
      </Group>
      <Group title="Header">
        {dataSource.reqHeader &&
          Object.entries(dataSource.reqHeader)
            .filter(([key, value]) => key !== 'Cookie' && value)
            .map(([key, value]) => {
              return (
                <Item label={key} key={key}>
                  {value}
                </Item>
              )
            })}
      </Group>

      <Group title="Cookies">
        {cookies &&
          Object.entries(cookies).map(([key, value]) => {
            return (
              <Item label={key} key={key}>
                {value}
              </Item>
            )
          })}
      </Group>

      <Group title="Body">
        {bodys &&
          Object.entries(bodys).map(([key, value]) => {
            return (
              <Item label={key} key={key}>
                {value}
              </Item>
            )
          })}
      </Group>
    </>
  )
}

const ResponseList = (props) => {
  const { dataSource = {} } = props
  console.log(dataSource.resHeader, 'resHeader')
  return (
    <>
      <Group title="General">
        {dataSource.method && <Item label="Status Code">{dataSource.statusCode}</Item>}
      </Group>
      <Group title="Header">
        {dataSource.resHeader &&
          Object.entries(dataSource.resHeader).map(([key, value]) => {
            return (
              <Item label={key} key={key}>
                {value}
              </Item>
            )
          })}
      </Group>
      <Group title="Body">{dataSource.resBody}</Group>
    </>
  )
}

export const AppSider: React.FC<Props> = (props) => {
  const { dataSource } = props
  const [tabKey, setTabKey] = React.useState<TabType>('Request')

  return (
    <Layout style={{ height: '100%', background: '#fff' }}>
      <div className={styles.header}>
        <Segmented options={tabs} value={tabKey} onChange={setTabKey} />
      </div>
      <Content style={{ height: '100%', marginTop: -1 }}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          {tabKey === 'Request' && <RequestList dataSource={dataSource} />}
          {tabKey === 'Response' && <ResponseList dataSource={dataSource} />}
        </div>
      </Content>
    </Layout>
  )
}
