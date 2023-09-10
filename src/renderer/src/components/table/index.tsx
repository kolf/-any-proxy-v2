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
import { Tr } from './Tr'
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
  onRowClick: (record: any) => void
}

export const Table: React.FC<Props> = (props) => {
  const { columns, dataSource, rowKey = 'id', onRowClick } = props
  const containerRef = React.useRef(null)
  const wrapperRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState<React.Key>(-1)
  const [list] = useVirtualList(dataSource, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 26,
    overscan: 10
  })

  return (
    <div className={styles['table']}>
      <div className={styles['thead']}>
        <Tr cols={columns.map(({ render, ...column }) => ({ ...column }))} />
      </div>
      <div className={styles['tbody']} ref={containerRef}>
        <div className="list" ref={wrapperRef}>
          {list.map((item, index) => (
            <Tr
              // key={item.data[rowKey]}
              index={index}
              selected={selectedIndex === item.index}
              onClick={() => {
                setSelectedIndex(item.index)
                onRowClick(item.data)
              }}
              cols={columns.map((column) => {
                let title = item.data[column.dataIndex]
                if (column.dataIndex === 'index') {
                  title = item.index + 1
                } else if (column.render) {
                  title = column.render(item.data)
                }
                // const title = column.render ? column.render(item.data) : item.data[column.dataIndex]
                return {
                  ...column,
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
