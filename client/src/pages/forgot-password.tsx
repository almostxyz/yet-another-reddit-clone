import { Box, Button } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useForgotPasswordMutation } from '../generated/graphql'

const ForgotPassword: React.FC<{}> = ({ }) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={async (values, { setErrors }) => {
                    await forgotPassword(values)
                    setComplete(true)
                }}
            >
                {({ isSubmitting, values }) => complete ? <Box>we've sent recovery email to {values.email}</Box> : (
                    <Form>
                        <InputField
                            name='email'
                            placeholder='email'
                            label='email'
                        />
                        <Button
                            mt={4}
                            type='submit'
                            isLoading={isSubmitting}
                            variantColor='teal'
                        >
                            Forgot Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper >
    )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(ForgotPassword)