'use strict'
import express from 'express'
import { VendingMachine } from '../services/vendingmachine'

const router = express.Router()
const vendingMachine: VendingMachine = new VendingMachine()

router.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).json(vendingMachine.combinations)
})

export default router