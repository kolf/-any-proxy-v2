import * as React from 'react'
import styles from './index.module.less'
import { SnippetsOutlined } from '@ant-design/icons'
interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
}
export const Group: React.FC<GroupProps> = ({ title, children }) => {
  return (
    <div className={styles['panel-group']}>
      <div className={styles['panel-group-title']}>
        {title}
        <span>
          <SnippetsOutlined />
        </span>
      </div>
      {children ? (
        <div className={styles['panel-group-body']}>{children}</div>
      ) : (
        <div style={{ padding: '24px 48px', textAlign: 'center' }}>No data</div>
      )}
    </div>
  )
}

export const Item: React.FC<ItemProps> = ({ label, children }) => {
  return (
    <div className={styles['panel-item']}>
      <label className={styles['panel-item-label']}>{label}: </label>
      <div className={styles['panel-item-value']}>{children}</div>
    </div>
  )
}
