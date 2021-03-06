$(document).ready(function(){
    let $buttons = $('#buttonWrapper>button')
    let $slides = $('#slides')
    let $images = $slides.children('img')
    let current = 0

    makeFakeSlide()
    $slides.css({transform:'translateX(-668px)'})
    bindEvents()
    $(next).on(`click`,function(){
        goToSlide(current+1)
    })
    $(previous).on(`click`,function(){
        goToSlide(current-1)
    })
    
    let timer = setInterval(function(){
        goToSlide(current+1)
    },2500)

    $(`.window`).on(`mouseenter`,function(){
        window.clearInterval(timer)
    })
    $(`.window`).on(`mouseleave`,function(){
        timer = setInterval(function(){
            goToSlide(current+1)
        },2000)
    })

    function bindEvents(){
        $(`#buttonWrapper`).on(`click`,`button`,function(e){
            let $button = $(e.currentTarget)
            let index = $button.index()
            current = index
            goToSlide(index)
        })
    }    

    function goToSlide(index){
        if(index>$buttons.length-1){
            index = 0
        }else if(index<0){
            index = $buttons.length-1
        }
        if (current === $buttons.length-1 && index === 0){
        //最后一张到第一张
            $slides.css({transform:`translateX(${-($buttons.length + 1)*668}px)`})
            .one('transitionend',function(){
                $slides.hide().offset()
                $slides.css({transform:`translateX(${-(index+1)*668}px)`}).show()
            })
        }else if(current === 0 && index === $buttons.length-1){
            //第一张到最后一张
            $slides.css({transform:`translateX(0)`})
            .one('transitionend',function(){
                $slides.hide().offset()
                $slides.css({transform:`translateX(${-(index+1)*668}px)`}).show()
            })
        }else{
            $slides.css({transform:`translateX(${-(index+1)*668}px)`})
        }
        current = index
    }

    function makeFakeSlide(){
        let $firstCopy = $images.eq(0).clone(true)
        let $lastCopy = $images.eq($images.length-1).clone(true)

        $slides.append($firstCopy)
        $slides.prepend($lastCopy)
    }

    
    $(clickMe).on('click',function(){
        $(popover).toggle()
        setTimeout(function(){
            $(document).one('click',function(){
                $(popover).hide()
            })
        },0)
    })
    
    $(container).on('click',function(e){
        e.stopPropagation()
    })


})





