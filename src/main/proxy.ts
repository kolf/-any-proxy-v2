/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 14:05:46
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 17:46:02
 * @FilePath: /any-proxy/src/main/proxy.ts
 * @Description:
 */
import { getProxyServer, globalProxy, certMgr } from '../lib/proxy'
import { proxyStore } from '../store/proxy'

let mainWindow: any = null
let proxyServer: any = null
let proxyRecorder: any = null
let cachePath = ''

/**
 * 代理开启
 */
export const proxyStart = (mw) => {
  // 如果已经有个实例，将其关闭
  proxyServer && proxyServer.close()

  proxyServer = getProxyServer(proxyStore.state)
  console.log('new proxyServer: ', proxyServer)
  proxyRecorder = proxyServer.recorder

  mainWindow = mw

  // certMgr()
  // 监听req
  proxyRecorder.on('update', (reqData) => {
    console.log('reqData', reqData)
    // sendMessage(reqData)ta
    mainWindow.webContents.send('to-get-req', JSON.stringify(reqData))
  })

  // 缓存路径
  cachePath = proxyServer.recorder.cachePath
  console.log('cachePath: ', cachePath)
  mainWindow.webContents.send('to-get-cachePath', cachePath)

  proxyServer.on('ready', () => {
    console.log('anyproxy 启动成功')
  })
  proxyServer.on('error', (e) => {
    console.log('anyproxy 发生错误: ', e)
  })

  proxyServer.start()

  if (proxyStore.state.recording) {
    globalProxy.enable(proxyStore.state.port)
    globalProxy.enableHttps(proxyStore.state.port)
  }
}

/** 代理关闭 */
export const proxyStop = () => {
  if (!proxyServer) return
  proxyServer.close()

  globalProxy.disable()
  globalProxy.disableHttps()
  proxyServer = proxyRecorder = null
}

/** 获取响应体 */
export const getResBody = (id) => {
  return new Promise((resolve, reject) => {
    proxyRecorder.getDecodedBody(id, (err, content) => {
      err ? reject(err) : resolve(content.content)
    })
  })
}
