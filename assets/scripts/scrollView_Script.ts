import {
  _decorator,
  Component,
  Node,
  ScrollView,
  Prefab,
  instantiate,
  pipeline,
  Label,
  loader,
  JsonAsset,
  EventMouse,
  random,
  
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("scrollView_Script")
export class scrollView_Script extends Component {
  @property(Prefab)
  myFab: Prefab | null = null;

//   @property(JsonAsset)
//   jsonFile: JsonAsset | null = null;


    personData= [
        {
        "name": "1",
        "rank": "1",
        "stars": "⭐️⭐️⭐️⭐️"
        },
        {
        "name": "2",
        "rank": "1",
        "stars": "⭐️⭐️⭐️"
        },
        {
        "name": "3",
        "rank": "2",
        "stars": "⭐️⭐️⭐️"
        },
        {
        "name": "4",
        "rank": "3",
        "stars": "⭐️⭐️"
        }
    ];

    topCnt: number; // very first node's label conunt
    bottomCnt: number; // last node's label count


    onLoad(){
        this.topCnt=0
        this.bottomCnt=4;

        // If user scrolls downwards
        this.node.on(ScrollView.EventType.SCROLL_TO_BOTTOM, (event: EventMouse) => { 
            console.log("Its Bottom");
            this.addToBottom();
        }, this);

        // If user scrolls upwards
        this.node.on(ScrollView.EventType.SCROLL_TO_TOP, (event: EventMouse) => { 
            console.log("Its Top");
            this.addToTop();
        }, this);
    }


  start() {
    console.log("Loading Data....");
    this.loadData();
    // let a = this.node.getComponent(ScrollView).isScrolling();
  }

  update(deltaTime: number) {
    
  }


  // Loading initial data
  loadData() {
    this.personData.forEach((person) => {
      let item = instantiate(this.myFab);
      item.getChildByName("itemNo").getComponent(Label).string = person.name;
      this.node.getComponent(ScrollView).content.addChild(item);
    });
  }

  // Loading dynamic data to the bottom
  addToBottom(){
    let scrollCont = this.node.getComponent(ScrollView).content.children.length;
    this.node.getComponent(ScrollView).content.children[0].getChildByName("itemNo").getComponent(Label).string= (this.bottomCnt+1).toString() ;
    this.node.getComponent(ScrollView).content.children[0].setSiblingIndex(scrollCont-1);
    this.bottomCnt+=1;
  }

  // Loading dynamic data to the top
  addToTop(){
    let scrollCont = this.node.getComponent(ScrollView).content.children.length;
    this.node.getComponent(ScrollView).content.children[scrollCont-1].getChildByName("itemNo").getComponent(Label).string= (this.topCnt-1).toString() ;
    this.node.getComponent(ScrollView).content.children[scrollCont-1].setSiblingIndex(0);
    this.topCnt-=1;
  }

}
