import { Box, Button, } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { createUrqlClient } from '../utils/createUrqlClient'

const CreatePost: React.FC<{}> = ({ }) => {
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values)
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name='title'
                            placeholder='title'
                            label='Title'
                        />
                        <Box mt={4}>
                            <InputField
                                name='text'
                                placeholder='The body of your post...'
                                label='Body'
                                textarea
                            />
                        </Box>
                        <Button
                            mt={4}
                            type='submit'
                            isLoading={isSubmitting}
                            variantColor='teal'
                        >
                            Create post
                        </Button>

                    </Form>
                )}
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePost)