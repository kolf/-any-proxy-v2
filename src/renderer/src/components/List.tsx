/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-15 14:37:17
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 21:13:22
 * @FilePath: /any-proxy/src/renderer/src/components/List.tsx
 * @Description:
 */
import * as React from 'react'
import { Table, theme } from 'antd'

const dataSource = [
  {
    key: '1',
    name: 'CONNECT',
    age: 200,
    address: 'alive.github.com',
    path: 'https://github.com/laissonsilveira/inject-fingerprint'
  },
  {
    key: '2',
    name: 'CONNECT',
    age: 400,
    address: 'alive.github.com',
    path: 'https://github.com/laissonsilveira/inject-fingerprint'
  }
]

const columns = [
  {
    title: 'Method',
    dataIndex: 'name',
    width: 60
  },
  {
    title: 'Code',
    dataIndex: 'age',
    width: 60
  },
  {
    title: 'Host',
    dataIndex: 'address',
    width: 200
  },
  {
    title: 'Path',
    dataIndex: 'path'
  },
  {
    title: 'Mime',
    dataIndex: 'mime'
  },
  {
    title: 'Time',
    dataIndex: 'startTime'
  }
]

interface Props {
  dataSource: Map<string, any>
}

const makeData = (dataSource) => {
  console.log(dataSource.values(), 'dataSource.values()')
  return [...dataSource.values()].map((value) => (Array.isArray(value) ? value[0] : null))
}

export const List: React.FC<Props> = (props) => {
  const { dataSource } = props
  return (
    <Table size="small" pagination={false} dataSource={makeData(dataSource)} columns={columns} />
  )
}
