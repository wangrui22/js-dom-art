var Client = {
    tcpPacketEnd:0,// 0 msg header;1 data for last msg;2 msg header for last msg header
    msgCmdID: 0,
    msgCellID: 0,

    recvData:function() {
        alert('recvData');
    }
}