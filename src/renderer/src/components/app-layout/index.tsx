/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-15 14:21:28
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-22 15:20:32
 * @FilePath: /any-proxy/src/renderer/src/components/AppLayout.tsx
 * @Description:
 */
import * as React from 'react'
import { CloseOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { Layout, Button, Space, Input } from 'antd'
import { Table, ColumnProps } from '../table'
import { createId, formatDate } from '../../utils'
import { AppSider } from '../app-sider'

const { Header, Content, Sider } = Layout

const columns: ColumnProps[] = [
  {
    title: '#',
    dataIndex: 'index',
    width: 60
    // render: (records) => {
    //   return <div style={{ textAlign: 'center' }}>{records.index}</div>
    // }
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
    dataIndex: 'path'
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
      const timeStr = formatDate(records.startTime, 'hh:mm:ss')
      return timeStr
    }
  }
]

const makeData = (data, inputValue) => {
  console.log(data, 'dataSource')
  // console.log(dataSource.values(), 'dataSource.values()')
  return data
    .filter((item) => item.host && item.path)
    .filter((item) =>
      inputValue ? item.host.includes(inputValue) || item.path.includes(inputValue) : true
    )
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
  const [selectedRowKey, setSelectedRowKey] = React.useState<number>(-1)
  const [inputValue, setInputValue] = React.useState<string>('')

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
      setData((data) => [...data, { ...req, _key }])
    }
  }, [window])

  console.log(selectedRowKey, 'selectedRowKey')
  const currentData = makeData(data, inputValue)

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <Layout style={{ height: '100%' }}>
          <div className="app-header">
            <Space size={12} style={{ flex: 1, paddingTop: 4 }}>
              <div style={{ textAlign: 'center' }}>
                <Button size="small" style={{ width: 42 }}>
                  <PlayCircleOutlined style={{ fontSize: 14 }} />
                </Button>
                <p>开始</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Button size="small" style={{ width: 42 }} onClick={() => setData([])}>
                  <CloseOutlined style={{ fontSize: 14 }} />
                </Button>
                <p>清除</p>
              </div>
            </Space>
            {/*<Input*/}
            {/*  style={{ width: 300, backgroundColor: '#eee' }}*/}
            {/*  placeholder="请输入域名或者路径"*/}
            {/*  bordered={false}*/}
            {/*  allowClear*/}
            {/*  onChange={(e) => setInputValue(e.target.value)}*/}
            {/*/>*/}
          </div>
          <Content style={{ height: '100%' }}>
            <Table
              rowKey="_key"
              dataSource={currentData}
              columns={columns}
              onSelectRowKey={setSelectedRowKey}
            />
          </Content>
        </Layout>
      </Content>
      <Sider width={400} style={{ borderLeft: '1px solid #e0e0e0' }}>
        <AppSider dataSource={currentData[selectedRowKey]} />
      </Sider>
    </Layout>
  )
}
