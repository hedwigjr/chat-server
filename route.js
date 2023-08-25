import { Router } from 'express'
const route = Router()

export default route.get('/',(req, res)=>{
    res.send('🚀')
})
