(function(){

    d3.select('body')
    .selectAll('p')
    .data([{key:0,data:'1'}, {key:1,data:'2'}, {key:2,data:'3'}], function(d) {
        return d.key;})
    .enter().append('p')
    .text(function(d) {
        return 'I am number ' + d.data + '!';
    });

    setTimeout(function() {
    d3.select('body')
    .selectAll('p')
    .data([{key:3,data:'4'}], function(d) {
        return d.key;})
    .enter().append('p')
    .text(function(d) {
        return 'I am number ' + d.data + '!';
    });
    },1000);

    setTimeout(function() {
        

        //update
        // d3.select('body')
        // .selectAll('p')
        // .data([{key:1,data:'12'}])
        // .text(function(d) {
        //     return 'I am number ' + d.data + '?';
        // });

        //key function update
        // d3.select('body')
        // .selectAll('p')
        // .data([{key:1,data:'12'}], function(d) {
        //     return d.key;
        // })
        // .text(function(d) {
        //     return 'I am number ' + d.data + '?';
        // });

        //remove
        d3.select('body')
        .selectAll('p')
        .data([{key:1,data:'2'}], function(d) {
            return d.key;
        })
        .exit().remove('p');

        

    }, 2000);

    // setTimeout(function() {
    //     d3.select('body')
    //     .selectAll('p')
    //     .data([{key:2,data:'1232323'}])
    //     .exit().remove('p')
    // }, 1000);
    
})();