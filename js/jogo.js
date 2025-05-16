function start()
{
    //Variáveis do jogo
    var tecla = {
	    W:87,
	    S:83,
	    A:65,
	    D:68,
        E:32 //tecla de espaço
    }
    var jogo = {}
    jogo.pressionou = [];

    var area_jogo = $('#area_jogo')
    area_jogo.append("<div id='player' class='player'></div>");
    area_jogo.append("<div id='nave' class='nave'></div>");
    area_jogo.append("<div id='tanque' class='tanque'></div>");
    area_jogo.append("<div id='pessoa' class='pessoa'></div>");

    //Funções básicas
    $(document).keydown(function(e){ //Pega a tecla que está pressionada
        jogo.pressionou[e.which] = true
    });

    $(document).keyup(function(e){ //Pega a tecla que acabei de soltar
        jogo.pressionou[e.which] = false
    });

    //Motor e execuções
    setInterval(engine, 30) //30 milésimos de segundo
    function engine()
    {
        cenario()
        movPlayer()
        tiroPlayer()
        movNave()
        colisao()
    }

    function cenario() 
    {
        var pos_atual = parseInt($('#area_jogo').css("background-position")) //Arrastando a imagem pra trás
        $('#area_jogo').css("background-position", pos_atual -1)
    }

    function movPlayer() 
    {
        var player = $('#player')
        if (jogo.pressionou[tecla.W]) //Subir
        {
            var posY = parseInt(player.css("top"))

            if (posY >= 10)
                player.css("top", posY - 2)
        }

        if (jogo.pressionou[tecla.S]) //Descer
        {
            var posY = parseInt(player.css("top"))
            //console.log(posY) -> Descobrindo limite para descida
            if (posY <= 284)
                player.css("top", posY + 2)
        }

        if (jogo.pressionou[tecla.A]) //Esquerda
        {
            var posX = parseInt(player.css("left"))
            if (posX >= 2)
                player.css("left", posX - 2)
        }

        if (jogo.pressionou[tecla.D]) //Direita
        {
            var posX = parseInt(player.css("left"))
            if (posX <= 564)
                player.css("left", posX + 2)
        }
    }

    function tiroPlayer()
    {
        var tiroP = $('#tiroPlayer')
        if (jogo.pressionou[tecla.E]) //tecla de espaço!
        {
            if(tiroP.length == 0)
            {
                area_jogo.append('<div id = "tiroPlayer"></div>')
                var p_top = parseInt($('#player').css('top'))
                var p_left = parseInt($('#player').css('left'))

                var tiro = $('#tiroPlayer')
                tiro.css('top', p_top + 25)
                tiro.css('left', p_left + 80)
            }
        }

        if(tiroP.length > 0)
        {
            var t_left = parseInt(tiroP.css('left'))
            if (t_left <= 640)
            {
                tiroP.css('left', t_left + 4)
            }
            else
            {
                tiroP.remove()
            }
        }
    }

    function movNave() 
    {
        var nave = $('#nave')

        if(nave.length == 0)
        {
            area_jogo.append('<div id = "nave" class="nave"></div>')
            
            var rand = Math.random() * 250
            $('#nave').css('top', rand)
        }

        if(nave.length >= 0)
        {
            var nave_left = parseInt(nave.css('left'))
            if(nave_left >= 0)
            {
                nave.css('left', nave_left - 3)
            }
            else
            {
                nave.remove()
            }
        }
    }

    function colisao()
    {
        //colisão entre player e nave
        var col_pla_nav = $('#player').collision( $('#nave') ).length
        var col_pla_tanque = $('#player').collision( $('#tanque') ).length
        var col_pla_tiro_inim = $('#player').collision( $('#tiro_inimigo') ).length
        
        if(col_pla_nav > 0 || col_pla_tanque > 0 || col_pla_tiro_inim > 0)
            //alert("colisao")
            explodePlayer()

    }

    function explodePlayer()
    {
        var player = $('#player')
        var p_left = parseInt(player.css('left'))
        var p_top = parseInt(player.css('top'))

        $('#player').remove()
        $('#area_jogo').append("<div class = 'player_explode'></div>")
        $('#player_explode').css('top', p_top)
        $('#player_explode').css('left', p_left)

       document.getElementById('explodePlayer').play()
        setTimeout(function() {
                $('#player_explode').remove();
                $('#area_jogo').append("<div class = 'player'></div>")
            },
            2000 //2 segundos
        )
    }
}

start();