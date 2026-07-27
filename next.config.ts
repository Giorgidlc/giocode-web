import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  serverExternalPackages: ['payload'],
}

export default withPayload(nextConfig)
