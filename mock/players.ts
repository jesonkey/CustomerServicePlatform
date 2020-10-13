import {Response,Request} from 'express'
import {Hero,Player} from "../src/api/types"
import {heros} from './hero'
import faker from 'faker'


faker.locale = 'zh_CN'

//模拟玩家数据
const playerCount = 100
const playerList:Player[] =[]

for(let i=0;i<playerCount;i++){
  playerList.push({
    id:i,
    accountname:faker.name.findName(),
    avatar: faker.image.avatar(),
    bravepoints: faker.random.number(1000),
    exp: faker.random.number(1000),
    level:faker.random.number(30),
    nickname: faker.name.findName(),
    rank: faker.random.number(200),
    wanttoplay:genWantoplay(),
    winningstreak:faker.random.number(10)

  })
}

function genWantoplay(){
  let wanttoplay: Set<Hero> = new Set();
  while(wanttoplay.size < 3){
    wanttoplay.add(heros[faker.random.number(9)])
  }
  return Array.from(wanttoplay)
}

export const getPlayers = (req:Request,res:Response) =>{

  const {accountname,page = 1,limit = 10} = req.query;

  let mockList = playerList.filter(item =>{

    if(accountname && item.accountname.indexOf(String(accountname)) < 0){
      return false
    }
    return true
  })



  //分页
  const pageList = mockList.filter((item,index)=>{
    return index < Number(limit)*Number(page) && index>=Number(limit)*(Number(page) - 1)
  })

  return res.json({
    code:2000,
    data:{
      total:mockList.length,
      players:pageList
    }
  })

}
