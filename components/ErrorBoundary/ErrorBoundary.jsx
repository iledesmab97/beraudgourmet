import React from "react"
import Ups from '@/components/Ups/Ups'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            errorMessage: '',
            resetCondition: props.resetCondition
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message }
    }

    componentDidCatch(error, info) {
        console.log('voy a mostar el error:', error.message)
        console.error(error)
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.resetCondition !== state.resetCondition) {
    //         return { hasError: false, resetCondition: props.resetCondition}
    //     }
    //     return null
    // }

    render() {
        if (this.state.hasError || this.props.error) {
            return (<Ups text={this.state.errorMessage} />)
        }

        return this.props.children
    }
}

export default ErrorBoundary