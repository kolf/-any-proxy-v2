/*
 * @Author: kolf kolf@live.cn
 * @Date: 2023-04-22 12:44:01
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-22 15:01:34
 * @FilePath: /any-proxy/src/renderer/src/components/Table/index.tsx
 * @Description: 表格组件
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react'
import styles from './index.module.less'
import { Empty } from 'antd'
import useVirtualList from 'ahooks/es/useVirtualList'

interface Column {
  title: React.ReactElement
  dataIndex: string
  width?: number
  render?: (text: string) => React.ReactElement
}

interface Props {
  columns: Column[]
  dataSource: any[]
  rowKey: string
  onRowClick
}

interface TrProps {
  cols: Column[]
  onClick?: (e: any) => void
}

const Tr: React.FC<TrProps> = ({ cols, onClick }) => {
  return (
    <div className={styles['tr']}>
      {cols.map((col) => (
        <div
          className={styles['td']}
          style={col.width ? { width: col.width } : { flex: 1 }}
          key={col.dataIndex}
          title={col.title + ''}
          onClick={onClick}
        >
          {col.title}
        </div>
      ))}
    </div>
  )
}

export const Table: React.FC<Props> = (props) => {
  const { columns, dataSource, rowKey = 'id' } = props
  const containerRef = React.useRef(null)
  const wrapperRef = React.useRef(null)
  const [list] = useVirtualList(dataSource, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 27,
    overscan: 10
  })

  const handleClick = (index: number) => {
    const item = dataSource[index]
    console.log(item, 'item')
  }

  console.log(dataSource.length, list, 'list')

  return (
    <div className={styles['table']}>
      <div className={styles['thead']}>
        <Tr cols={columns.map(({ render, ...column }) => ({ ...column }))} />
      </div>
      <div className={styles['tbody']} ref={containerRef}>
        <div className="list" ref={wrapperRef}>
          {list.map((item, index) => (
            <Tr
              key={item[rowKey]}
              onClick={() => {
                handleClick(index)
              }}
              cols={columns.map((column) => {
                const title = column.render ? column.render(item.data) : item.data[column.dataIndex]
                return {
                  ...column,
                  index: item.index + 1,
                  title
                }
              })}
            />
          ))}
        </div>
      </div>
      {dataSource.length === 0 && (
        <div className={styles['empty']}>
          <Empty description="暂无数据" />
        </div>
      )}
    </div>
  )
}
