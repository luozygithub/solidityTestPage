<template>
  <div class="test">
    <RainbowHeader></RainbowHeader>
    <div class="contract">
      <div class="contract-nav">
        <div class="contract-nav-item"  @click="activeName = 'Contract'" >
          Contract
        </div>
        <div class="contract-nav-item" @click="activeName = item.name" v-for="(item,itemindex) in contractNameArr" :key="itemindex">
          {{ item.name }}
        </div>
      </div>
      <div class="contract-box" v-show="activeName =='Contract'">
        <div class="active-contract">
          <div class="contract-item" @click="chooseContract(item.contract)" v-for="(item,index) in addressArr" :key="index">
            <div class="name">
              {{item.contract}}
            </div>
            <div class="address">
              {{item.address}}
            </div>
          </div>
        </div>
      </div>
      <div class="contract-item" v-for="(item,itemindex) in contractNameArr" :key="itemindex">
        <div class="active-contract" v-show="item.name == activeName">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="content">
            <div class="content-item" v-for="(abi,index) in item.abiArr" :key="index">
              <div class="content-item-name">
                {{ abi.name }}
              </div>
              <div class="inputs">
                <div class="input" v-for="(input,inputindex) in abi.inputs" :key="inputindex">
                  {{ input }}:
                  <el-input v-model="abi.values[inputindex]" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="button" @click="handleClick({name:item.name,abi})">
                调用
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RainbowHeader from "@/components/RainbowHeader";
import {getContractList} from "@/api/test";

export default {
  name: "testSolidity",
  components: {RainbowHeader},
  data() {
    return {
      activeName:"RBB",
      contractNameArr: [],
      values: {},
      param1: null,
      addressArr:[],
      solPathArr:[]
    }
  },
  created() {
    getContractList().then(res => {
      this.addressArr = res
    })
    const files = require.context('../../abi/', false, /.json$/).keys();

    for (let i = 0; i < files.length; i++) {
      let name = files[i].substr(2, files[i].length - 7)

      let networks = require("../../abi/" + name + ".json").networks["1234"]
      if (!networks) {
        continue
      }
      let contracntAbi = require("../../abi/" + name + ".json").abi

      let abiArr = []
      for (let j = 0; j < contracntAbi.length; j++) {
        let abi = contracntAbi[j]
        let abiObj = {inputs: []}
        for (let k = 0; k < abi.inputs.length; k++) {
          let inputObj = abi.inputs[k]
          abiObj.inputs.push(inputObj.name)
        }
        abiObj.name = abi.name
        abiObj.values = {}
        abiArr.push(abiObj)
      }
      this.contractNameArr.push({
        name,
        abiArr
      })
    }

  },
  methods: {
    chooseContract(name){
      console.log(name)
      for(let i=0;i<this.solPathArr.length;i++){
        if(this.solPathArr[i].indexOf(name.trim())){
          console.log(this.solPathArr[i])
        }
      }
    },
 
    handleClick({name, abi}) {
      let path = name + "/" + abi.name
      console.log(path)
      let values = abi.values
      let inputs = abi.inputs
      console.log(abi)
      console.log(inputs)

      let params = {}
      if (inputs&&inputs.length == 1) {
        params = values[0]
      } else {
        for (const inputsKey in values) {
          params[inputs[inputsKey]] = values[inputsKey]
        }
      }
      console.log(path,params)
      this.$store.dispatch(path,params).then(res => {console
        alert(res)
      }).catch(err => {
        alert(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test {

  height: 100%;
  width: 100%;
  overflow: auto;
  .contract-box{
    .contract-item{
      display: flex;
      height: 40px;
      .address{
        padding: 0 20px;
      }
    }
  }
  .contract {
    .contract-nav {
      display: flex;
      padding-bottom: 30px;
       flex-wrap: wrap;
      .contract-nav-item {
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid #666;
        margin-left: 10px;
      }
    }

    .contract-item {
      cursor: pointer;
      .name {
        padding-left: 20px;
        font-size: 20px;
        font-weight: bold;
      }

      .content {
        .content-item {
          height: 80px;
          display: flex;
          padding: 10px 0;
          align-items: center;
          .content-item-name {
            color: #0B9FE1;
            padding-left: 50px;
            font-size: 16px;
            min-width: 240px;
            font-weight: bold;
          }

          .inputs {
            padding: 0 20px;
            display: flex;
          }

          .button {
            border: 1px solid #666;
            width: 100px;
            height: 40px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;

          }
        }

      }
    }
  }
}
</style>
