export default function (context) {
    // Add the userAgent property to the context
    context.userAgent = process.server
        ? context.req.headers['user-agent'].toLowerCase().includes('micromessenger')?'source=wx':'source=M'
        : navigator.userAgent.toLowerCase().toLowerCase().includes('micromessenger')?'source=wx':'source=M'
}