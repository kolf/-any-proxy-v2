/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-15 14:21:28
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-19 09:04:00
 * @FilePath: /any-proxy/src/renderer/src/components/AppLayout.tsx
 * @Description:
 */
import * as React from 'react'
import {
  IdcardOutlined,
  BranchesOutlined,
  PlayCircleOutlined,
  HighlightOutlined
} from '@ant-design/icons'
import { Layout, Table, Button, Space } from 'antd'
import { List } from './List'
import { createId, formatDate } from '../utils'
import { Details } from './Details'

const { Header, Content, Sider } = Layout

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    width: 60
  },
  {
    title: 'Method',
    dataIndex: 'method',
    width: 100
  },
  {
    title: 'Code',
    dataIndex: 'statusCode',
    width: 70
  },
  {
    title: 'Host',
    dataIndex: 'host',
    width: 200
  },
  {
    title: 'Path',
    dataIndex: 'path',
    ellipsis: true
  },
  {
    title: 'MIME',
    width: 150,
    dataIndex: 'mime'
  },
  {
    title: 'Time',
    width: 100,
    dataIndex: 'startTime',
    render: (text) => {
      const timeStr = formatDate(text, 'hh:mm:ss')
      return <span>{timeStr}</span>
    }
  }
]

const makeData = (dataSource) => {
  // console.log(dataSource, 'dataSource')
  // console.log(dataSource.values(), 'dataSource.values()')
  return dataSource
    .filter((item) => item.host)
    .map((item, index) => {
      const { host, path, method, statusCode } = item
      return {
        index: index + 1,
        host,
        path,
        method,
        statusCode
      }
    })
}

export const AppLayout: React.FC = () => {
  // const [dataMap, update] = React.useState(new Map())
  const [data, setData] = React.useState([])

  const update = (e, reqData) => {
    const req = JSON.parse(reqData)
    const id = createId()
    data.push({ ...req, _key: id })
    setData(data)
    // const key = 'reqId-' + id
    // const oldData = dataMap.get(key)
    // console.log(oldData, 'oldData')
    // if (oldData) {
    //   dataMap.set(key, [...oldData, data])
    // } else {
    //   dataMap.set(key, [data])
    // }

    // update(dataMap)
  }

  React.useEffect(() => {
    const { ipcRenderer } = window.electron
    console.log(window, 'window')
    ipcRenderer?.on('to-get-req', update)
    ipcRenderer?.send('ready-to-init-proxy')
  }, [window])

  return (
    <Layout style={{ height: '100vh' }}>
      <Content className="app-body">
        <Header
          className="app-header"
          style={{ background: '#fff', paddingTop: 12, paddingLeft: 76, lineHeight: 1.6 }}
        >
          <Space>
            <div style={{ textAlign: 'center' }}>
              <Button size="small" style={{ width: 50 }}>
                <PlayCircleOutlined style={{ fontSize: 14 }} />
              </Button>
              <p>开始</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button size="small" style={{ width: 50 }} onClick={() => setData([])}>
                <HighlightOutlined style={{ fontSize: 14 }} />
              </Button>
              <p>清除</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button size="small" style={{ width: 50 }}>
                <BranchesOutlined style={{ fontSize: 14 }} />
              </Button>
              <p>规则</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button size="small" style={{ width: 50 }}>
                <IdcardOutlined style={{ fontSize: 14 }} />
              </Button>
              <p>证书</p>
            </div>
          </Space>
        </Header>

        <div className="app-list">
          <Table
            size="small"
            rowKey="id"
            pagination={false}
            dataSource={makeData(data)}
            columns={columns}
          />
        </div>
      </Content>
      <Sider width={'40%'} theme="light" style={{ borderLeft: '1px solid #f5f5f5' }}>
        <Details />
      </Sider>
    </Layout>
  )
}
