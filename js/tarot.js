(function(root){
  'use strict';
  // Original game-oriented readings; upright/reversed are interpreted separately.
  const majors = [
    ['愚者','THE FOOL','风','启程','轻装上路，为一个小目标迈出第一步。','迟疑','检查背包再出发，别把冒失当勇气。','explore,battle','prepare,rest','踏出新路，也要记得看脚下。'],
    ['魔术师','THE MAGICIAN','火','创造','把手头材料连成生产链，灵感需要一次动手。','分心','先完成一件作品，不必同时点燃每一座炉。','craft,learn','prepare,rest','留意材料消耗，不要只看成品的光。'],
    ['女祭司','THE HIGH PRIESTESS','水','静观','翻阅资料，观察规律，让知识先于行动。','迷雾','信息还不完整，暂缓那次没有把握的决定。','learn,rest','prepare,rest','不明白的机制，值得多看一遍。'],
    ['皇后','THE EMPRESS','木','丰饶','照顾资源与补给，缓慢生长也会带来回报。','透支','先补充库存，别让一段生产链饿着肚子。','gather,craft','prepare,gather','丰收也需要给仓库留出空间。'],
    ['皇帝','THE EMPEROR','火','秩序','给装备、补给和目标排好顺序，稳稳推进。','僵持','旧计划可以调整，别为了坚持而耗空资源。','prepare,battle','rest,learn','规矩是工具，别让计划拖着你走。'],
    ['教皇','THE HIEROPHANT','土','传承','成熟的配装与训练路线，今天值得借鉴。','变通','换个角度读攻略，找到适合当前进度的路。','learn,prepare','explore,learn','照着攻略前进，也要核对自己的条件。'],
    ['恋人','THE LOVERS','风','契合','挑一组互相支持的技能，让资源彼此衔接。','取舍','先定一个目标，再决定哪些材料值得花。','craft,prepare','prepare,rest','今天的选择，别只看一时的心动。'],
    ['战车','THE CHARIOT','水','推进','准备齐全之后，可以向熟悉的挑战迈进。','失速','把补给与节奏找回来，再考虑走得多远。','battle,explore','prepare,rest','推进之前，确认自己握得住缰绳。'],
    ['力量','STRENGTH','火','耐心','温和而持久的训练，比急着证明自己更有力。','疲惫','给冒险一点余量，慢下来仍然是在前进。','battle,gather','rest,prepare','实力也包含适时收手的判断。'],
    ['隐者','THE HERMIT','土','沉潜','适合安静练习与积累，把注意力留给一件事。','封闭','偶尔翻翻指引，独行也可以借一盏灯。','learn,gather','explore,prepare','别在已经无效的路线里独自打转。'],
    ['命运之轮','WHEEL OF FORTUNE','火','转机','顺着现有资源换一条路线，看看新的可能。','反复','接受暂时的停顿，先完成手边稳定的小事。','explore,craft','gather,prepare','波动是过程，不是加倍投入的理由。'],
    ['正义','JUSTICE','风','衡量','清点收益与投入，做一次清醒的资源分配。','失衡','别让一项消耗拖住全部进度，先算清库存。','prepare,learn','rest,gather','公平地看待投入，也看待自己的耐心。'],
    ['倒吊人','THE HANGED MAN','水','换位','让一段安静的挂机替你积累，换个角度看目标。','松绑','停止无谓的等待，先处理真正卡住的环节。','rest,gather','prepare,explore','等一等有价值，空耗却未必。'],
    ['死神','DEATH','水','更新','整理旧装备与旧路线，给下一阶段留位置。','留恋','检查是否还在为过时的目标耗费材料。','prepare,explore','learn,rest','这张牌说的是更替，不是现实中的死亡。'],
    ['节制','TEMPERANCE','火','调和','采集和生产交替安排，留住资源的平衡。','过量','把计划缩小一点，避免某种材料提前见底。','craft,prepare','gather,rest','适量比一口气做完更长久。'],
    ['恶魔','THE DEVIL','土','执念','看清让你反复点击的目标，别忘了最初的乐趣。','挣脱','可以放下那条让人疲惫的路线，回到轻松的节奏。','learn,prepare','rest,explore','稀有掉落不值得拿快乐来换。'],
    ['高塔','THE TOWER','火','重整','检查薄弱环节，把需要重做的部分理清。','预防','主动检查装备与补给，让小修补发生在出发前。','prepare,learn','prepare,rest','别忽视已经看见的缺口。'],
    ['星星','THE STAR','风','希望','给长线目标添一小格进度，日积月累自有光。','回望','别只盯着终点，看看今天已经积累了什么。','gather,learn','rest,prepare','期待可以很远，今天的目标可以很小。'],
    ['月亮','THE MOON','水','直觉','先探索与观察，模糊的信息值得多核对一步。','澄明','把猜测整理成问题，再去找清楚的答案。','explore,learn','learn,prepare','不确定时，给决定留一个回头的出口。'],
    ['太阳','THE SUN','火','明朗','做一件看得见进度的事，让小小成果照亮今天。','微光','不用追求每一步都完美，稳定前进就很好。','battle,craft','gather,rest','好心情也要配上够用的补给。'],
    ['审判','JUDGEMENT','火','回顾','检查过去的投入，把积累转化成下一步行动。','犹疑','先做一次小尝试，不必等所有条件完美。','learn,explore','prepare,craft','复盘是为了前进，不是苛责昨天。'],
    ['世界','THE WORLD','土','圆满','收好一个阶段的成果，再为新目标留出位置。','未竟','补完最后一个环节，让未完成的计划有个落点。','craft,explore','prepare,gather','收尾同样值得耐心。']
  ];
  const suitData = [
    {name:'权杖',en:'WANDS',element:'火',motif:'wand',tags:['battle','explore'],domain:'行动与探索'},
    {name:'圣杯',en:'CUPS',element:'水',motif:'cup',tags:['rest','gather'],domain:'补给与休整'},
    {name:'宝剑',en:'SWORDS',element:'金',motif:'sword',tags:['learn','battle'],domain:'判断与挑战'},
    {name:'星币',en:'PENTACLES',element:'土',motif:'coin',tags:['gather','craft'],domain:'资源与生产'}
  ];
  const ranks = [
    ['王牌','ACE','萌芽','一个新计划正在等待开始。','搁置','从最小的一步重新开始。','explore','prepare'],
    ['二','TWO','规划','先看两条路线各自需要什么。','摇摆','暂时只选一个目标。','prepare','rest'],
    ['三','THREE','协作','让不同技能彼此接力。','脱节','补齐生产链缺少的那一环。','craft','prepare'],
    ['四','FOUR','安定','稳住库存与当前节奏。','停滞','给过于单调的计划一点调整。','rest','explore'],
    ['五','FIVE','磨合','看清冲突，调整资源分配。','修复','从最容易恢复的一项开始。','learn','prepare'],
    ['六','SIX','回馈','已有积累可以支持下一步。','牵绊','别让旧习惯占满今天。','gather','learn'],
    ['七','SEVEN','考验','有耐心，也要定期检查方向。','重估','重新衡量这段等待是否值得。','battle','prepare'],
    ['八','EIGHT','专注','专心训练，给熟练留出时间。','散乱','减少切换，完成一件小事。','craft','rest'],
    ['九','NINE','守成','留好余量，珍惜已有成果。','松弛','休整片刻，再看新的目标。','gather','rest'],
    ['十','TEN','收束','整理本阶段的积累与负担。','卸重','放下一项不再适合的计划。','prepare','rest'],
    ['侍从','PAGE','求知','用小投入学习新的玩法。','稚嫩','先了解机制，再消耗稀有材料。','learn','prepare'],
    ['骑士','KNIGHT','前行','带着清楚的目标去行动。','急躁','核对准备，避免一时兴起。','explore','rest'],
    ['王后','QUEEN','滋养','把资源安排得从容一些。','失顾','照顾那些被忽略的补给。','gather','prepare'],
    ['国王','KING','统筹','从全局安排今天的进度。','固执','为变化留出余地。','prepare','learn']
  ];
  const deck=majors.map((m,i)=>({id:i,name:m[0],en:m[1],element:m[2],major:true,number:i,motif:['road','wand','moon','leaf','crown','key','heart','chariot','lion','lantern','wheel','scales','hourglass','rose','cup','chain','tower','star','moon','sun','horn','world'][i],up:{key:m[3],text:m[4],tags:m[7].split(',')},reverse:{key:m[5],text:m[6],tags:m[8].split(',')},warning:m[9]}));
  // Suit-specific symbolism, rewritten for an idle-game context. Reversals use one
  // chosen interpretation rather than pretending all tarot traditions agree.
  const minorReadings=[
    [
      ['火种','让新想法落地，开始一次小小的尝试。','未燃','给计划补齐材料，再点第一把火。','explore,craft','prepare,gather'],
      ['远望','比较路线，选择下一段想走的远方。','迟疑','先完成眼前的一步，地图可以慢慢展开。','prepare,explore','prepare,rest'],
      ['拓展','已有准备足够支持一次新的探索。','延误','先检查补给与前置条件，别急着远行。','explore,gather','prepare,learn'],
      ['庆成','享受一个阶段的完成，安顿好自己的营地。','未稳','先把基础补齐，再开始下一轮庆祝。','rest,prepare','prepare,gather'],
      ['切磋','在可控的挑战中打磨技巧。','止争','避开无谓的较劲，回到自己的节奏。','battle,learn','rest,prepare'],
      ['凯旋','把积累的实力用于一个准备充分的目标。','求认','不用靠一次漂亮战绩证明今天有价值。','battle,explore','gather,rest'],
      ['坚守','守住自己的节奏，迎接有把握的挑战。','退让','补给见底时，退一步也是判断力。','battle,prepare','rest,gather'],
      ['疾行','路线明确时，可以让行动顺畅地接续。','滞缓','检查卡住的资源环节，速度自然会回来。','explore,craft','prepare,gather'],
      ['韧性','留一份备用补给，耐心走完最后一段。','倦意','暂时松开弓弦，休整后再继续。','battle,prepare','rest,gather'],
      ['负重','任务有些满，先整理肩上的负担。','卸担','放下一项额外目标，让挂机重新轻松。','prepare,rest','rest,prepare'],
      ['好奇','以小成本探索一种新玩法。','躁动','把冒险冲动写成一个具体的小目标。','explore,learn','prepare,learn'],
      ['热忱','带好补给，把行动力用在清楚的方向。','冒进','别让一时兴起替你决定消耗多少材料。','battle,explore','prepare,rest'],
      ['自信','熟悉的技能值得从容地发挥。','内耗','减少比较，找回自己喜欢的进度。','craft,explore','rest,learn'],
      ['统领','把各条技能路线安排成一幅清楚的地图。','急令','计划留一点弹性，别催每个环节同时开工。','prepare,battle','prepare,rest']
    ],[
      ['新泉','给冒险添一点新鲜感，也给补给留个位置。','枯杯','先照顾疲惫的心情，轻松挂机也很好。','gather,rest','rest,prepare'],
      ['契合','让两项技能互相供给，形成舒服的配合。','失配','检查相接的环节是否有材料断档。','craft,prepare','prepare,gather'],
      ['欢聚','庆祝一点小收获，别让效率挤走乐趣。','过欢','收一收过多的目标，给自己一点清静。','rest,gather','rest,prepare'],
      ['倦怠','若对进度无感，可以停下来换个角度。','新意','留意此前忽略的玩法，小尝试也有新鲜感。','rest,learn','explore,learn'],
      ['失落','没得到想要的掉落，也仍有其他积累。','转晴','把注意力转向还在手中的资源。','rest,prepare','gather,craft'],
      ['旧趣','重温熟悉的技能，找一点最初的轻松。','向前','把旧习惯放下，给新目标腾个位置。','gather,rest','explore,prepare'],
      ['幻景','选项很多，先分清想象和手里的条件。','落定','缩小选择，把一个可行的目标做好。','learn,prepare','craft,prepare'],
      ['离席','离开已无乐趣的路线，寻找更合适的方向。','难舍','检查自己是否只因投入太久而不愿停下。','explore,rest','learn,prepare'],
      ['知足','享受现有成果，今天的小满足已经足够。','空杯','掉落之外，也值得找回游戏本身的乐趣。','rest,gather','rest,learn'],
      ['和乐','让采集、补给和冒险形成舒适的循环。','失和','重新安排计划，让节奏适合现在的你。','craft,rest','prepare,rest'],
      ['灵感','跟随一个温柔的小念头，试试不同的安排。','敏感','给一时的失望一点空间，再决定是否继续。','explore,rest','rest,prepare'],
      ['向往','把喜欢的目标放在心上，温和地靠近它。','浮想','先确认条件，别只被理想中的奖励吸引。','explore,craft','learn,prepare'],
      ['体察','留意自己的耐心，用舒适的方式积累。','耗情','今天不必强迫自己追逐所有目标。','rest,gather','rest,prepare'],
      ['从容','平稳地安排挑战，别让波动带走节奏。','失控','心急时先收手，整理补给与计划。','prepare,rest','rest,learn']
    ],[
      ['明辨','一个清晰的判断，会让路线变得简单。','混沌','先读懂机制，暂缓模糊的决定。','learn,battle','learn,prepare'],
      ['两难','把两个选项需要的条件摆在眼前。','决断','补齐信息后，结束迟迟不动的权衡。','learn,prepare','prepare,explore'],
      ['失意','一次不如意不代表整段进度失去意义。','愈合','从轻松的活动重新开始，慢慢找回手感。','rest,learn','rest,gather'],
      ['休整','让资源替你慢慢增长，暂时放下紧迫感。','复苏','休整之后，可以带着准备重新出发。','rest,gather','prepare,explore'],
      ['代价','赢下一次较量，也要看清花掉了什么。','和解','停止无谓的较劲，重新安排下一步。','learn,prepare','rest,prepare'],
      ['渡行','带着已有经验，平稳转向下一段路线。','困渡','检查让你停留在旧路线上的真正原因。','explore,prepare','learn,rest'],
      ['谋略','灵巧可以省力，提前观察比硬闯更好。','坦诚','重新审视捷径，别忽略它的条件与代价。','explore,learn','learn,prepare'],
      ['受限','先找出限制自己的那一项前置条件。','解缚','解决小瓶颈后，可以重新选择方向。','learn,prepare','explore,craft'],
      ['忧虑','别让还未发生的失败占满挂机的心情。','释怀','把担心拆成检查项，做完就安心休息。','rest,learn','prepare,rest'],
      ['终章','该结束的低效路线，可以到这里为止。','再起','整理残余资源，为重新开始做准备。','rest,prepare','prepare,gather'],
      ['求真','好奇地查一查机制，信息会成为准备。','纷讯','来源太多时，先核对最关键的一条。','learn,explore','learn,prepare'],
      ['锐进','目标明确时，集中力量完成一段挑战。','莽冲','在加速之前，再看一眼装备与消耗。','battle,explore','prepare,rest'],
      ['清醒','用清楚的标准判断什么值得继续投入。','苛刻','别用一次坏结果否定全部进度。','learn,prepare','rest,learn'],
      ['理性','让数据与机制帮助你安排今天的训练。','武断','结论之前多检查一步，保留调整余地。','learn,battle','learn,prepare']
    ],[
      ['新资','一份新资源，可以成为下一段生产的起点。','错机','整理手中材料，再决定如何开始。','gather,craft','prepare,gather'],
      ['周转','让采集与消耗保持轮换，不让库存失衡。','失衡','减少同时运转的项目，先补最缺的一项。','craft,prepare','gather,prepare'],
      ['匠心','材料、技艺与计划配合起来，作品便有了形。','脱节','检查生产链的接缝，让每一环都跟得上。','craft,learn','prepare,learn'],
      ['守财','保留资源有其价值，也要给使用留一点空间。','松手','让闲置的资源服务于一个值得的小目标。','gather,prepare','craft,explore'],
      ['短缺','先补基础物资，别急着开展新的消耗。','回补','库存慢慢恢复，先稳住日常供给。','gather,prepare','gather,craft'],
      ['流通','合理分配资源，让强项支持薄弱环节。','偏配','检查是否把全部材料都给了同一个目标。','craft,prepare','prepare,gather'],
      ['耕耘','长线积累需要耐心，也需要定期看一眼方向。','重估','等待太久时，重新比较投入与回报。','gather,learn','learn,prepare'],
      ['精进','重复练习能留下成果，适合专心打磨技能。','倦工','换个节奏，别把熟练变成机械的疲惫。','craft,learn','rest,prepare'],
      ['自足','享受自己的积累，稳稳经营手里的资源。','虚荣','不要为了好看的进度耗空真正需要的材料。','gather,craft','prepare,rest'],
      ['厚积','长期经营开始形成基础，适合整理与传承。','失基','检查稳固外表下，是否缺少关键的供给。','prepare,craft','prepare,gather'],
      ['学艺','从基础配方练起，把新知识变成可见进度。','怠学','先弄懂材料用途，再投入下一批资源。','learn,craft','learn,prepare'],
      ['勤耕','按可靠的节奏积累，慢也能走得很远。','僵化','稳定之外，也值得看看有没有更合适的路线。','gather,craft','learn,explore'],
      ['持家','把补给与生产照顾好，让冒险从容运转。','失顾','腾一点精力给被忽视的基础库存。','craft,prepare','gather,prepare'],
      ['稳业','用已经建立的资源基础，支持成熟的计划。','贪积','别为了更多而忘了这些资源原本用来做什么。','craft,prepare','rest,learn']
    ]
  ];
  suitData.forEach((s,si)=>ranks.forEach((r,ri)=>{const m=minorReadings[si][ri];deck.push({id:22+si*14+ri,name:s.name+r[0],en:r[1]+' OF '+s.en,element:s.element,major:false,number:ri+1,motif:s.motif,up:{key:m[0],text:m[1],tags:m[4].split(',')},reverse:{key:m[2],text:m[3],tags:m[5].split(',')},warning:'留意'+s.domain+'中的节奏与代价。'});}));
  root.Tarot={deck};
})(typeof window!=='undefined'?window:globalThis);
