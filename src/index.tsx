import React, { Component, ReactNode } from 'react'
import { Animated, StyleSheet, View, ViewProps } from 'react-native'

export type LoadingViewProps = ViewProps & {
  loading: boolean
  fallback: ReactNode
  showDuration: number
  hideDuration: number
  animated: boolean
  showContentDelay: number
}

type LoadingViewState = {
  visibleFallback: boolean
}

export default class LoadingView extends Component<LoadingViewProps, LoadingViewState> {

  /**
   * Default props
   */
  static defaultProps = {
    loading: false,
    showDuration: 200,
    hideDuration: 200,
    animated: true,
    showContentDelay: 0,
  }

  /**
   * Component state
   */
  state = {
    visibleFallback: this.props.loading,
  }

  /**
   * Animation value
   */
  protected animation: Animated.AnimatedValue = new Animated.Value(+this.props.loading)

  /**
   * Defines is component mounted
   */
  protected mount: boolean = false

  /**
   * Show fallback
   */
  protected show = async () => {
    const { animated, showDuration } = this.props
    if (animated) {
      await this.stopAnimation()
      await this.setState({ visibleFallback: true })
      Animated.timing(this.animation, {
        toValue: 1,
        duration: showDuration,
        useNativeDriver: true,
      }).start()
    } else {
      await this.setState({ visibleFallback: true })
    }
  }

  /**
   * Hide fallback
   */
  protected hide = async () => {
    const { animated, hideDuration } = this.props
    if (animated) {
      await this.stopAnimation()
      Animated.timing(this.animation, {
        toValue: 0,
        duration: hideDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          this.setState({ visibleFallback: false })
        }
      })
    } else {
      await this.setState({ visibleFallback: false })
    }
  }

  /**
   *  Stop animation
   */
  protected stopAnimation = (): Promise<void> => {
    return new Promise((resolve) => {
      this.animation.stopAnimation(() => resolve())
    })
  }

  /**
   * @override
   */
  public setState = <K extends keyof LoadingViewState> (state: Pick<LoadingViewState, K>): Promise<void> => {
    return new Promise((resolve) => {
      if (this.mount) {
        super.setState(state, resolve)
      } else {
        resolve()
      }
    })
  }

  /**
   * Sets mount flag to true
   */
  componentDidMount () {
    this.mount = true
  }

  /**
   * Sets mount flag to false
   */
  componentWillUnmount () {
    this.mount = false
  }

  /**
   *
   * @param prevProps
   */
  componentDidUpdate (prevProps: Readonly<LoadingViewProps>) {
    if (prevProps.loading !== this.props.loading) {
      if (this.props.loading) {
        this.show()
      } else {
        if (this.props.showContentDelay > 0) {
          setTimeout(() => {
            this.hide()
          }, this.props.showContentDelay)
        } else {
          this.hide()
        }
      }
    }
  }

  /**
   * Render component
   */
  render () {
    const { animated, children, fallback, loading, ...props } = this.props
    const { visibleFallback } = this.state
    return (
      <View {...props}>
        {
          animated ? (
            <Animated.View
              style={[
                {
                  opacity: this.animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                },
              ]}
            >
              {loading ? null : children}
            </Animated.View>
          ) : (
            loading ? null : children
          )
        }

        {
          visibleFallback ? (
            animated ? (
              <Animated.View
                style={[
                  styles.fallbackView,
                  {
                    opacity: this.animation,
                  },
                ]}
              >
                {fallback}
              </Animated.View>
            ) : (
              <View style={styles.fallbackView}>
                {fallback}
              </View>
            )
          ) : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fallbackView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#f00',
  },
})
