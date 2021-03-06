'use strict'
import express from 'express'
import { VendingMachine } from '../services/vendingmachine'

const router = express.Router()
const vendingMachine: VendingMachine = new VendingMachine()

router.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).json(vendingMachine.products)
});

router.get('/extras', (_req: express.Request, res: express.Response) => {
  res.status(200).json(vendingMachine.extras)
});

router.get('/cash', (_req: express.Request, res: express.Response) => {
  res.status(200).json(vendingMachine.cash)
});

router.post('/cash', (req: express.Request, res: express.Response) => {
  if(!req.body.price || isNaN(req.body.price)) {
    res.status(400).end();
  } else {
    vendingMachine.cash = parseFloat(eval(vendingMachine.cash.toString()) + eval(req.body.price)).toFixed(2);
    res.status(200).json(vendingMachine.cash);
  }
});

export default router