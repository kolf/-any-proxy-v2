/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-15 14:21:28
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-22 15:20:32
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
import { Layout, Button, Space, Input } from 'antd'
import { Table } from './table'
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
    width: 80
  },
  {
    title: 'Code',
    dataIndex: 'statusCode',
    width: 60
  },
  {
    title: 'Host',
    dataIndex: 'host',
    width: 120
  },
  {
    title: 'Path',
    dataIndex: 'path',
    ellipsis: true
  },
  {
    title: 'MIME',
    width: 120,
    dataIndex: 'mime'
  },
  {
    title: 'Time',
    width: 72,
    dataIndex: 'startTime',
    render: (records) => {
      console.log(records, 'text')
      const timeStr = formatDate(records.startTime, 'hh:mm:ss')
      return timeStr
    }
  }
]

const makeData = (data) => {
  console.log(data, 'dataSource')
  // console.log(dataSource.values(), 'dataSource.values()')
  return data
    .filter((item) => item.host && item.path)
    .map((item, index) => {
      return {
        ...item,
        index: index + 1
      }
    })
}

export const AppLayout: React.FC = () => {
  // const [dataMap, update] = React.useState(new Map())
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!window.electron) {
      return
    }
    const { ipcRenderer } = window.electron
    ipcRenderer?.on('to-get-req', update)
    ipcRenderer?.send('ready-to-init-proxy')

    function update(_, reqData): void {
      const req = JSON.parse(reqData)
      const _key = createId()
      console.log(data, 'data')
      setData((data) => [...data, { ...req, _key }])
    }
  }, [window])

  return (
    <Layout style={{ height: '100vh', minWidth: 600 }}>
      <Content className="app-body">
        <Header
          className="app-header"
          style={{
            background: '#fff',
            padding: '12px 20px 0 76px',
            lineHeight: 1.6
          }}
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
            {/*<div style={{ textAlign: 'center' }}>*/}
            {/*  <Button size="small" style={{ width: 50 }}>*/}
            {/*    <IdcardOutlined style={{ fontSize: 14 }} />*/}
            {/*  </Button>*/}
            {/*  <p>证书</p>*/}
            {/*</div>*/}
          </Space>
          <div style={{ float: 'right', paddingRight: 0, paddingTop: 5, width: 300 }}>
            <Input placeholder="搜索" style={{ background: '#eee', border: 'none' }} />
          </div>
        </Header>

        <div className="app-list">
          <Table rowKey="_key" dataSource={makeData(data)} columns={columns} />
        </div>
      </Content>
      <Sider width={'40%'} theme="light" style={{ borderLeft: '1px solid #f5f5f5' }}>
        <Details />
      </Sider>
    </Layout>
  )
}
