<template>
    <div>
        <h4>循环生成含1W个li标签的列表，每个li标签中的内容从0开始增加，部分标签内容特定</h4>
        <div id="manytags"></div>
    </div>
</template>
<script>
export default {
    name:'Li10000',
    mounted(){
        document.querySelector('#manytags').appendChild(combainNodes())
    }
}

    function createDom(tagname, tagattribute, childnodes,
        istext) { // tagname/text ,tag attributes ,childnode ,istext
            var dom;
            if (istext === undefined) {
                dom = document.createElement(tagname)
                if (tagattribute !== undefined) {
                    for (var key in tagattribute) {
                        if (tagattribute[key] !== undefined) {
                            dom.setAttribute(key, tagattribute[key])
                        }
                    }
                }
                if (childnodes != undefined) {
                    dom.appendChild(childnodes)
                }
            } else {
                dom = document.createTextNode(tagname)
            }
            return dom;
        }


        function createLiData() {
            var liData = []
            for (var i = 0; i <= 10000; i++) {
                liData.push({
                    tagname: 'li',
                    childnodes: {
                        text: '#' + i
                    }
                })
            }
            return liData
        }
        var liData = createLiData();
        liData[1].childnodes = {
            tagname: 'span',
            childnodes: {
                text: '#1'
            }
        }
        liData[3].childnodes = {
            tagname: 'ul',
            childnodes: {
                tagname: 'li',
                childnodes: {
                    text: '#4'
                }
            }
        }
        liData[9998].childnodes = {
            tagname: 'a',
            href: "//koal.com",
            childnodes: {
                text: '#9998'
            }
        }

        var domtree = {
            tagname: 'ul',
            id: 'list',
            class: 'aaa',
            childnodes: liData
        }

        function createChild(data) {
            var childnode;
            if (data.tagname !== undefined) {
                if (data.childnodes !== undefined) {
                    if (data.childnodes.tagname != undefined) {
                        childnode = createChild(data.childnodes)
                    } else {
                        // console.log('无tagname')
                        childnode = createDom(data.childnodes.text, {}, undefined, 1)
                    }
                }
                var parenttmp = createDom(data.tagname, {
                    id: data.id,
                    class: data.class,
                    href: data.href
                }, childnode)
            }
            return parenttmp
        }

        function combainNodes() {
            var ul = createDom(domtree.tagname, {
                id: domtree.id,
                className: domtree.class
            })
            for (var i in domtree.childnodes) {
                ul.appendChild(createChild(domtree.childnodes[i]))
            }
            return ul;
        }
</script>
<style lang="scss">
    
</style>