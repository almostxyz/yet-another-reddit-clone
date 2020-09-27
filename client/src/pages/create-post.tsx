import { Box, Button, } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/Layout'
import { Wrapper } from '../components/Wrapper'
import { useCreatePostMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useRouter } from 'next/router'

const CreatePost: React.FC<{}> = ({ }) => {
    const router = useRouter()
    const [, createPost] = useCreatePostMutation()
    return (
        <Layout variant='small'>
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const { error } = await createPost({ input: values })
                    if (error?.message.includes('401')) {
                        router.push('/login')
                    } else {
                        router.push('/')
                    }

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
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(CreatePost)