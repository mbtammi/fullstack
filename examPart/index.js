import { useState } from 'react'

const list = [{m: 'Hei'}, {m:'Hey'}, {m:'Hi'}]
return list.map(elem =>
    <div key={elem.m}> {elem.m} </div>
  )
