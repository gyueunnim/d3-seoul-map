window.onload = function() {
    drawMap('#container');
};

//지도 그리기
function drawMap(target) {
    var width = 1000; //지도의 넓이
    var height = 1000; //지도의 높이
    var initialScale = 5450; //확대시킬 값
    var initialX = -11900; //초기 위치값 X
    var initialY = 4050; //초기 위치값 Y
    var labels;

    var projection = d3.geo
        .mercator()
        .scale(initialScale)
        .translate([initialX, initialY]);

    var path = d3.geo.path().projection(projection);

    var zoom = d3.behavior
        .zoom()
        .translate(projection.translate())
        .scale(projection.scale())
        .scaleExtent([height, 1600 * height])
        .on('zoom', zoom);

    var svg = d3
        .select(target)
        .append('svg')  // svg element 추가
        .attr('width', width + 'px')
        .attr('height', height + 'px')
        .attr('id', 'map')  // id를 map으로 
        .attr('class', 'map');  // class를 map으로
    
    var states = svg
        .append('g')    // g element 추가
        .attr('id', 'states')   // states id 추가
        .call(zoom);

    // console.log(path);
    // console.log(map);

    states
        .append('rect')
        .attr('class', 'background')
        .attr('width', width + 'px')
        .attr('height', height + 'px');

    var 지도데이터; // 지도데이터에 어떻게 값 받아올지?
    
    //geoJson데이터를 파싱하여 지도그리기
    d3.json('json/seoul.json', function(json) {
        states
            .selectAll('path') //지역 설정
            .data(json.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('id', function(d) {
                // return 'path-' + d.properties.name_eng;  
                return 'path-' + d.properties.SIG_ENG_NM;              
            });
            
            // feature 통해서 배열 데이터 접근
            지도데이터 = json.features;
            // console.log(지도데이터);
            
            // var clickpath = states.selectAll('path');

            /*
            노가다 데이터 받아오기 연습
            */
            var gangbukgu =states.select('#path-Gangbuk-gu');
            var dobonggu = states.select('#path-Dobong-gu');
            var yeongdeungpogu = states.select('#path-Yeongdeungpo-gu');
            var nowongu = states.select('#path-Nowon-gu');
            var eunpyeonggu = states.select('#path-Eunpyeong-gu');
            var seongbukgu = states.select('#path-Seongbuk-gu');
            var jungnanggu = states.select('#path-Jungnang-gu');
            var jongnogu = states.select('#path-Jongno-gu');
            var dongdaemungu = states.select('#path-Dongdaemun-gu');
            var seodaemungu = states.select('#path-Seodaemun-gu');
            var junggu = states.select('#path-Jung-gu');
            var mapogu = states.select('#path-Mapo-gu');
            var yongsangu = states.select('#path-Yongsan-gu');
            var seongdonggu = states.select('#path-Seongdong-gu');
            var gwangjingu = states.select('#path-Gwangjin-gu');

            
            var tempArray = [dobonggu, yeongdeungpogu, gangbukgu, nowongu, eunpyeonggu, jongnogu, seongbukgu, jungnanggu, seodaemungu, dongdaemungu, mapogu, junggu, seongdonggu, gwangjingu, yongsangu];
            

            tempArray[0].on('click', (e) => { 
                console.log('저 '+e.properties.SIG_KOR_NM+'인데 왜 눌려요!');
                tempArray.map((e) => {
                    e.attr('class', 'no-selected');
                })
                dobonggu.attr('class', 'selected');
            })
            tempArray[1].on('click', (e) => { 
                console.log('저 '+e.properties.SIG_KOR_NM+'인데 왜 눌려요!, 뚜뚜 사는 곳');
                tempArray.map((e) => {
                    e.attr('class', 'no-selected');
                })
                yeongdeungpogu.attr('class', 'selected');
            })
            tempArray[2].on('click', (e) => { 
                console.log('저 '+e.properties.SIG_KOR_NM+'인데 왜 눌려요!');
                tempArray.map((e) => {
                    e.attr('class', 'no-selected');
                })
                gangbukgu.attr('class', 'selected');
            })
            tempArray[3].on('click', (e) => { 
                console.log('저 '+e.properties.SIG_KOR_NM+'인데 왜 눌려요!');
                tempArray.map((e) => {
                    e.attr('class', 'no-selected');
                })
                nowongu.attr('class', 'selected');
            })
            tempArray[4].on('click', (e) => { 
                console.log('저 '+e.properties.SIG_KOR_NM+'인데 왜 눌려요!');
                tempArray.map((e) => {
                    e.attr('class', 'no-selected');
                })
                eunpyeonggu.attr('class', 'selected');
            })
            // dobonggu.on('click', (e) => { // tempArray[0].on
            //     console.log('저 도봉구인데 왜 눌려요!');
            //     tempArray.map((e) => {
            //         e.attr('class', 'no-selected');
            //     })
            //     dobonggu.attr('class', 'selected');
            //     // yeongdeungpogu.attr.m('class', 'no-selected');
            // })
            


            // clickpath.on('click', (e) => {
            //     console.log(e.properties.SIG_KOR_NM + '로 이동');
            //     clickpath.attr('class', 'selected'); // 클래스 추가로 클릭 이벤트 발생 시 테두리 진해지게 함 -> 근데 다 진해짐... -> clickpath에서 특정 태그를 id통해서 추출 후 class 넣는 방식으로 시도 해 볼 예정
                
            //     // console.log(e);
            //     // e.properties.SIG_ENG_NM = e.properties.SIG_ENG_NM+'1'; // properties 변경으로 색 칠하기 시도 -> 실패
            // })



            // clickpath.addEventListener('click', (e) => {
            //     console.log(clickpath);
            // })
            // console.log(clickpath);

        labels = states
            .selectAll('text')
            .data(json.features) //라벨표시
            .enter()
            .append('text')
            .attr('transform', translateTolabel)
            .attr('id', function(d) {
                // return 'label-' + d.properties.name_eng;
                return 'label-' + d.properties.SIG_ENG_NM;
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '.35em')
            .text(function(d) {
                // return d.properties.name;
                return d.properties.SIG_KOR_NM;
            });
    });

    //텍스트 위치 조절 - 하드코딩으로 위치 조절을 했습니다.
    function translateTolabel(d) {
        var arr = path.centroid(d);
        if (d.properties.code == 31) {
            //서울 경기도 이름 겹쳐서 경기도 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 20
                    : initialScale / height + 20;
        } else if (d.properties.code == 34) {
            //충남은 조금 더 내리기
            arr[1] +=
                d3.event && d3.event.scale
                    ? d3.event.scale / height + 10
                    : initialScale / height + 10;
        }
        return 'translate(' + arr + ')';
    }

    function zoom() {
        projection.translate(d3.event.translate).scale(d3.event.scale);
        states.selectAll('path').attr('d', path);
        labels.attr('transform', translateTolabel);
    }
}

// console.log(d3.selectAll('states'));

// path_event.addEventListener('click', (event) => {
//     console.log(path_event);
// })


function showCountryNameInRange(mouseX, mouseY) {
    const countries = getGeoJSONData();
    const MapCoord = projection.invert([mouseX, mouseY]);
    const country = countries.find((country) => {
      return MapCoord !== null && geoContains(country, MapCoord); // 좌표가 지도에 포함되었는지 확인
    });
  
    if (country) {
      console.log(country.properties.SIG_KOR_NM);
    }
  }
