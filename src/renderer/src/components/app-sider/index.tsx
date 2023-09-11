import { Layout, Segmented } from 'antd'
const { Content } = Layout
import * as React from 'react'
import styles from './index.module.less'
import { parseCookies } from '../../utils'
import * as Panel from '../panel'

interface Props {
  dataSource: any
}

type TabType = 'Request' | 'Response'

const tabs: TabType[] = ['Request', 'Response']

const RequestList = (props) => {
  const { dataSource = {} } = props
  const cookies = dataSource.reqHeader ? parseCookies(dataSource.reqHeader?.Cookie) : null
  const body = dataSource.reqBody
  const headers = typeof dataSource.reqHeader === 'object' ? dataSource.reqHeader : null

  return (
    <>
      <Panel.Group title="General">
        {dataSource.method && (
          <>
            <Panel.Item label="Method">{dataSource.method}</Panel.Item>
            <Panel.Item label="URL">{dataSource.url}</Panel.Item>
            <Panel.Item label="Protocol">{dataSource.protocol}</Panel.Item>
            <Panel.Item label="Method">{dataSource.method}</Panel.Item>
          </>
        )}
      </Panel.Group>
      <Panel.Group title="Header">
        {headers &&
          Object.entries(headers)
            .filter(([key, value]) => key !== 'Cookie' && value)
            .map(([key, value]) => {
              return (
                <Panel.Item label={key} key={key}>
                  {value}
                </Panel.Item>
              )
            })}
      </Panel.Group>

      <Panel.Group title="Cookies">
        {cookies &&
          Object.entries(cookies).map(([key, value]) => {
            return (
              <Panel.Item label={key} key={key}>
                {value}
              </Panel.Item>
            )
          })}
      </Panel.Group>
      <Panel.Group title="Body">{body}</Panel.Group>
    </>
  )
}

const ResponseList = (props) => {
  const { dataSource = {} } = props
  const headers = dataSource.resHeader

  return (
    <>
      <Panel.Group title="General">
        {dataSource.statusCode && (
          <Panel.Item label="Status Code">{dataSource.statusCode}</Panel.Item>
        )}
      </Panel.Group>
      <Panel.Group title="Header">
        {typeof headers === 'object' &&
          Object.entries(headers).map(([key, value]) => {
            return (
              <Panel.Item label={key} key={key}>
                {value}
              </Panel.Item>
            )
          })}
      </Panel.Group>
      <Panel.Group title="Body">{dataSource.resBody}</Panel.Group>
    </>
  )
}

export const AppSider: React.FC<Props> = (props) => {
  const { dataSource } = props
  const [tabKey, setTabKey] = React.useState<TabType>('Request')

  return (
    <Layout style={{ height: '100%', background: '#fff' }}>
      <div className={styles.header}>
        <Segmented
          options={tabs}
          value={tabKey}
          onChange={(v) => {
            setTabKey(v as TabType)
          }}
        />
      </div>
      <Content style={{ height: '100%', marginTop: -1 }}>
        <div style={{ height: '100%', overflow: 'auto' }}>
          {tabKey === 'Request' && <RequestList dataSource={dataSource || {}} />}
          {tabKey === 'Response' && <ResponseList dataSource={dataSource || {}} />}
        </div>
      </Content>
    </Layout>
  )
}
