import Caver from 'caver-js';
//import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from '../abi/KIP17TokenABI.json';
import CounterABI from '../abi/KIP17TokenABI.json';
import { ACCESS_KEY_ID, SECRET_KEY_ID, COUNT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, CHAIN_ID} from '../constants';
const option = {
    headers: [
      {
        name: "Authorization",
        value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_KEY_ID).toString("base64")
      },
      {name: "x-chain-id", value: CHAIN_ID}
    ]
  }
  
  const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
  const NFTContract = new caver.contract(CounterABI, NFT_CONTRACT_ADDRESS);

  export const fetchCardsOf = async (address) => {
    // Fetch balance
    const balance = await NFTContract.methods.balanceOf(address).call();
    console.log(`[NFT Balance]${balance}`);
    // Fetch Token IDs
    const tokenIds = [];
    for(let i = 0 ; i < balance ; i++){
      const id = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
      tokenIds.push(id);
    }
    // Fetch Token URIs
    const tokenUris = [];
    for(let i = 0 ; i < balance ; i++){
      const uri = await NFTContract.methods.tokenURI(tokenIds[i]).call();
      tokenUris.push(uri);
    }
    const nfts = [];
    for (let i = 0 ; i < balance ; i++){
      nfts.push({uri: tokenUris[i], id: tokenIds[i]});
    }
    console.log(nfts);
    return nfts;
  }

  
  export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => { // then((response) => ) 응답이 올 경우 실행
      const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
      console.log(`BALANCE: ${balance}`);
      return balance;
    })
  }
  
  // const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

  // export const readCount = () =>{
  //   const _count = CountContract.methods.count().call();
  //   console.log(_count);
  // }

  // export const setCount = async(newCount) => {
  //   // 사용할 account 설정
  //   try{
  //     const privatekey = '0x8372cbef347fefb5dd3e960975b62db57de3978abea0ca020c57b5edfdacb2d1';
  //     const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
  //     caver.wallet.add(deployer);
  //     // 스마트 컨트랙트 실행 트랜잭션 날리기
  //     // 결과확인
  //     const receipt = await CountContract.methods.setCount(newCount).send({
  //       from: deployer.address,//address
  //       gas:"0x4bfd200"
  //     })
  //     console.log(receipt);
  //   }catch(e) {
  //     console.log(`[ERROR_SET_COUNT]${e}`);
  //   }
  // }

