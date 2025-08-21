// 그룹별 파일 데이터
const fileGroups = {
    "개척 가이드": [
        {
            id: 1,
            title: "최신 개척덱",
            description: "시즌25 기준 개척덱 가이드",
            fileType: "PDF",
            path: "files/시즌25_개척덱.pdf",
        },
        {
            id: 2,
            title: "(old) 개척덱",
            description: "과거 개척덱 가이드",
            fileType: "JPG",
            path: "files/old_starter.jpg",
        },
        {
            id: 2,
            title: "개척의 정석(강하제)",
            description: "강하제 개척덱 가이드",
            fileType: "PDF",
            path: "files/개척의 정석(강하제).pdf",
        },
        {
            id: 3,
            title: "임무보상",
            description: "초반 임무보상",
            fileType: "PDF",
            path: "files/시즌25_임무보상.pdf",
        },
        {
            id: 4,
            title: "건설가이드",
            description: "건설 테크트리 가이드",
            fileType: "JPG",
            path: "files/tech_1.jpg",
        },
        {
            id: 5,
            title: "S25 폭탄/병기 가이드",
            description: "S25 폭탄/병기 가이드",
            fileType: "PDF",
            path: "files/시즌25_폭탄병기.pdf",
        },
        {
            id: 6,
            title: "무명/낮밤 병기 가이드",
            description: "무명과 낮밤 맹의 과거 병기 가이드",
            fileType: "JPG",
            path: "files/병기.jpg",
        },
        {
            id: 7,
            title: "삼국지 계산판",
            description: "삼국지에서 계산이 필요할 때...",
            fileType: "HTML",
            path: "http://www.lifebefore.co.kr/samgepan/index.php",
        }
    ],
    "시즌 가이드": [
        {
            id: 11,
            title: "진창전투 공용 가이드",
            description: "S18 진창전투 공용 가이드",
            fileType: "PDF",
            path: "files/시즌 18 가이드_진창전투 최종.pdf",
        },
        {
            id: 12,
            title: "진창전투 Top Team 가이드",
            description: "S18 진창전투 Top Team 가이드",
            fileType: "PDF",
            path: "files/S18 진창전투 TOP TEAM 가이드.pdf",
        },
        {
            id: 13,
            title: "진창전투 낮밤 가이드",
            description: "S18 진창전투 낮밤 가이드",
            fileType: "PDF",
            path: "files/낮밤가이드_S18진창전투(배포용).pdf",
        },
    ],
    "덱 티어표": [
        {
            id: 25,
            title: "최신 중국섭 티어표 (S25 가이드)",
            description: "S25 가이드에 포함된 최신 중국섭 티어표",
            fileType: "PDF",
            path: "files/시즌25_티어덱.pdf",
        },
    ]
};

class FileViewer {
    constructor() {
        this.currentFilter = 'all';
        this.fileGrid = document.getElementById('fileGrid');
        
        this.init();
    }

    init() {
        this.renderGroups();
        this.setupEventListeners();
    }

    renderGroups() {
        if (this.currentFilter === 'all') {
            // 모든 그룹을 표시
            this.fileGrid.innerHTML = Object.entries(fileGroups).map(([groupName, files]) => 
                this.createGroupSection(groupName, files)
            ).join('');
        } else {
            // 특정 그룹만 표시
            const groupName = this.currentFilter;
            const files = fileGroups[groupName] || [];
            this.fileGrid.innerHTML = this.createGroupSection(groupName, files);
        }
        
        // 카드 클릭 이벤트 추가
        this.fileGrid.querySelectorAll('.file-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const fileId = parseInt(e.currentTarget.dataset.fileId);
                
                // 파일 찾기
                let file = null;
                for (const files of Object.values(fileGroups)) {
                    file = files.find(f => f.id === fileId);
                    if (file) break;
                }
                
                // 바로 해당 파일로 이동
                if (file && file.path) {
                    window.location.href = file.path;
                }
            });
        });
    }

    createGroupSection(groupName, files) {
        return `
            <div class="group-section">
                <div class="group-header">
                    <h2 class="group-title">${groupName}</h2>
                    <span class="group-count">${files.length}개 파일</span>
                </div>
                <div class="group-files">
                    ${files.map(file => this.createFileCard(file)).join('')}
                </div>
            </div>
        `;
    }

    createFileCard(file) {
        const icon = this.getFileIcon(file.fileType);
        
        return `
            <div class="file-card" data-file-id="${file.id}">
                <div class="file-icon">
                    ${icon}
                </div>
                <div class="file-title">${file.title}</div>
                <div class="file-description">${file.description}</div>
                <!--<div class="file-meta">
                    <span>${file.size}</span>
                    <span class="file-type">${file.fileType}</span>
                </div>-->
            </div>
        `;
    }

    getFileIcon(fileType) {
        const icons = {
            'PDF': '📄',
            'HTML': '🌐',
            'ZIP': '📦',
            'PNG': '🖼️',
            'JPG': '🖼️',
            'MD': '📝',
            'JSON': '🔧',
            'TXT': '📄'
        };
        return icons[fileType] || '📄';
    }

    setupEventListeners() {
        // 필터 버튼 이벤트
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // 필터 버튼 활성화 상태 업데이트
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        // 그룹 다시 렌더링
        this.renderGroups();
    }

}

// 페이지 로드 완료 후 FileViewer 초기화
document.addEventListener('DOMContentLoaded', () => {
    new FileViewer();
});

// 검색 기능 (선택사항)
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '파일 검색...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 12px;
        margin: 0 auto 30px;
        display: block;
        border: none;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.9);
        font-size: 16px;
    `;
    
    const filterNav = document.querySelector('.filter-nav');
    filterNav.parentNode.insertBefore(searchInput, filterNav.nextSibling);
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.file-card');
        
        cards.forEach(card => {
            const title = card.querySelector('.file-title').textContent.toLowerCase();
            const description = card.querySelector('.file-description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 검색 기능 활성화 (원하면 주석 해제)
// document.addEventListener('DOMContentLoaded', addSearchFunctionality);
