### Install
using npm
```text
npm install @anvilapp/react-native-loading-view --save
```
or using yarn
```text
yarn add @anvilapp/react-native-loading-view
```

### Usage example
```jsx
import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import LoadingView from '@anvilapp/react-native-loading-view'

const App = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <View style={{ flex: 1 }}>
        <LoadingView
          style={{ flex: 1 }}
          loading={loading}
          fallback={<ActivityIndicator size="large" color="#000"/>}
          animated={true}
        >
          ...Your content
        </LoadingView>
    </View>
  )
}

export default App
```
