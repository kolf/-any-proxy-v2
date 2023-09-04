/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-16 14:07:07
 * @LastEditors: kolf kolf@live.cn
 * @LastEditTime: 2023-04-22 14:40:17
 * @FilePath: /any-proxy/src/store/proxy.ts
 * @Description:
 */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalProxy } from '../lib/proxy'

const defaultState = {
  port: 8001,
  rule: null,
  webInterface: {
    enable: true
  },
  // throttle: 10000,
  forceProxyHttps: true,
  wsIntercept: true, // websocket代理
  silent: false,
  recording: false
}

export const proxyStore = {
  debug: true,
  state: { ...defaultState },
  /**
   * @param {number} newPort
   */
  setPort(newPort) {
    if (newPort === this.state.port) return
    if (this.debug) console.log('set port: ', newPort)
    this.state.port = newPort
    require('electron').ipcRenderer.send('reload-my-proxy')
  },

  /**
   * @param {string} newRulePath
   */
  setRulePath(newRulePath) {
    if (newRulePath === this.state.rulePath) return
    if (this.debug) console.log('set rulePath: ', newRulePath)
    this.state.rulePath = newRulePath
    require('electron').ipcRenderer.send('reload-my-proxy')
  },

  /**
   * @param {number} newThrottle
   */
  setThrottle(newThrottle) {
    if (newThrottle === this.state.throttle) return
    if (this.debug) console.log('set throttle: ', newThrottle)
    this.state.throttle = newThrottle
    require('electron').ipcRenderer.send('reload-my-proxy')
  },

  setThrottleStatus(newStatus) {
    if (newStatus === this.state.throttleStatus) return
    if (this.debug) console.log('set throttleStatus: ', newStatus)
    this.state.throttleStatus = newStatus
    require('electron').ipcRenderer.send('reload-my-proxy')
  },

  /**
   * @param {boolean} newValue
   */
  setRecording(newValue) {
    if (newValue === this.state.recording) return
    if (this.debug) console.log('set recording: ', newValue)
    if (newValue) {
      globalProxy.enable(this.state.port)
      this.state.recordingHttps && globalProxy.enableHttps(this.state.port)
    } else {
      globalProxy.disable()
      globalProxy.disableHttps()
      this.state.recordingHttps = false
    }
    this.state.recording = newValue
  },

  /**
   * @param {boolean} newValue
   */
  setRecordingHttps(newValue) {
    if (newValue === this.state.recordingHttps) return
    if (this.debug) console.log('set recordingHttps: ', newValue)
    if (newValue) {
      this.state.recording && globalProxy.enableHttps(this.state.port)
    } else {
      globalProxy.disableHttps()
    }
    this.state.recordingHttps = newValue
  },

  /**
   * @param {string} newCachePath
   */
  setCachePath(newCachePath) {
    if (newCachePath === this.state.cachePath) return
    if (this.debug) console.log('set cachePath: ', newCachePath)
    this.state.cachePath = newCachePath
  }
}
