import styles from './index.module.less'
import { ColumnProps } from './index'
import * as React from 'react'
import cn from 'classnames'
interface TrProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
  cols: ColumnProps[]
  onClick?: (e) => void
  selected?: boolean
}
const Row: React.FC<TrProps> = ({ index, className, selected, cols, onClick }) => {
  return (
    <div
      className={cn(styles['tr'], className, {
        [styles['tr-clickable']]: selected,
        [styles['tr-even']]: index !== undefined && index % 2
      })}
    >
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

export const Tr = React.memo(Row)
