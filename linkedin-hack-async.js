// Steps
// 1. get all connection btns
// 2. trigger connect accept on all of them
// 3. check if accepted by linkedin

async function acceptAllConnectionRequest(){
    
    //steo 1
    const acceptBtns = document.querySelectorAll('.invitation-card__action-container button:nth-child(2)');
    
    const promises = [];
    acceptBtns.forEach((acceptBtn , index) => {
        // if(index > 0) return ; 
        promises.push(triggerAcceptClick(acceptBtn,index))
    })
    var response = await Promise.all(promises)
    console.log(response);
}

async function triggerAcceptClick(acceptBtn,index) {
    //null check
    if(!acceptBtn) return;
    // step 2
    acceptBtn.click();
    console.log('Intiating connection btn click accept for - ',acceptBtn.ariaLabel);
    // step3
    try{
    const isAccepted = await checkForAcceptance(acceptBtn,index)
        if(isAccepted){
            console.log('Accepted connection for - ',acceptBtn.ariaLabel);
        }else{
            console.error('Acceptance request failed for - ',acceptBtn.ariaLabel);
        }
        return (isAccepted ? 'Connection Accepted for ':'Connection reject for - ') + acceptBtn.ariaLabel;
    }   
    catch(err) {
        console.error(err);
    }
    return 'na'
}

function checkForAcceptance(acceptBtn,index) {
    return new Promise((resolve,reject) => {
        let counter = 0;

   var timerId =  setInterval(() => {
        const parentCont = document.querySelectorAll('.invitation-card__action-container')[index];
        
        if(!parentCont) return;
        
        counter++;
        console.log('Acceptance check triggered for ',counter, ' time for -',acceptBtn.ariaLabel);

        if(parentCont.children.length == 1){
            console.log('Accepted accepted for -',acceptBtn.ariaLabel);
            clearInterval(timerId);
            resolve(true)
        }
       
        // handle failure case after 10 times checking 
        if(counter == 10){
            console.error('Acceptance request failed for - ',acceptBtn.ariaLabel);
            clearInterval(timerId)
            resolve(false)
        }
    },1000)
    })
    
}