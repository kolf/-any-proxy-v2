/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 13:45:45
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 13:47:16
 * @FilePath: /any-proxy/src/lib/proxy.ts
 * @Description: 
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AnyProxy = require('anyproxy')

export const getProxyServer = (cfg) => new AnyProxy.ProxyServer(cfg)

/** 全局HTTP代理 */
export const globalProxy = {
  /**
   * 开启
   * @param {number} port
   */
  enable(port) {
    AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '' + port)
  },

  /**
   * 开启
   * @param {number} port
   */
  enableHttps(port) {
    AnyProxy.utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', '' + port, 'https')
  },

  /** 关闭 */
  disable() {
    AnyProxy.utils.systemProxyMgr.disableGlobalProxy()
  },

  /** 关闭 */
  disableHttps() {
    AnyProxy.utils.systemProxyMgr.disableGlobalProxy('https')
  }
}

/** 证书管理 */
export const certMgr = () => {
  if (AnyProxy.utils.certMgr.ifRootCAFileExists()) return
  AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
    // let users to trust this CA before using proxy
    if (!error) {
      const certDir = require('path').dirname(keyPath)
      console.log('The cert is generated at', certDir)
      const isWin = /^win/.test(process.platform)
      const exec = require('child_process').exec
      if (isWin) {
        exec('start .', { cwd: certDir })
      } else {
        exec('open .', { cwd: certDir })
      }
    } else {
      console.error('error when generating rootCA', error)
    }
  })
}
