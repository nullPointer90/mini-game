$(document).ready(function(){
    var currentAccount = "";
    checkMM();
    $("#btnRegister").click(function(){
        $.post("./register",{
            Email:$("#txtEmail").val(),
            Name:$("#txtName").val(),
            Phone:$("#txtPhone").val(),
        }, function(data){
            console.log(data);
        });
    });

    $("#btnConnectMetaMask").click(function(){
        connectMM().then((data) =>{
            //console.log(data);
            currentAccount = data[0];
            console.log(currentAccount);
            $("#notice").text("Connect Meta Mask successfully!");
        }).catch((err) =>{
            console.log(err);
            $("#notice").text("Connect Meta Mask error!");
        });
    });
    
});

async function connectMM(){
    const accounts = await ethereum.request({method:'eth_requestAccounts' });
    return accounts;
}

function checkMM(){
    if (typeof window.ethereum !== 'undefined')
    {
        console.log("Metamask is intalled");
    }
    else
    {
        console.log("Metamask not install");
    }
}