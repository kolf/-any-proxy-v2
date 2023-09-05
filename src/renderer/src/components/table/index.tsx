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
export interface ColumnProps {
  title: React.ReactNode
  dataIndex: string
  width?: number
  render?: (item: any) => React.ReactNode
}

interface Props {
  columns: ColumnProps[]
  dataSource: any[]
  rowKey: string
  onSelectRowKey: (index: number) => void
}

export const Table: React.FC<Props> = (props) => {
  const { columns, dataSource = [], rowKey = 'id', onSelectRowKey } = props
  const [selectedKey, setSelectedKey] = React.useState<number>(-1)
  const containerRef = React.useRef(null)
  const wrapperRef = React.useRef(null)
  const [list] = useVirtualList(dataSource, {
    containerTarget: containerRef,
    wrapperTarget: wrapperRef,
    itemHeight: 26,
    overscan: 10
  })

  const handleClick = (index: number) => {
    setSelectedKey(index)
    onSelectRowKey && onSelectRowKey(index)
  }

  return (
    <div className={styles['table']}>
      <div className={styles['thead']}>
        <Tr cols={columns.map(({ render, ...column }) => ({ ...column }))} />
      </div>
      <div className={styles['tbody']} ref={containerRef}>
        <div className="list" ref={wrapperRef}>
          {list.map((item) => {
            const { data, index } = item
            return (
              <Tr
                index={index}
                key={data[rowKey]}
                selected={selectedKey === index}
                onClick={() => {
                  handleClick(index)
                }}
                cols={columns.map((column) => {
                  const title = column.render ? column.render(data) : data[column.dataIndex]
                  return {
                    ...column,
                    index: index + 1,
                    title
                  }
                })}
              />
            )
          })}
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
