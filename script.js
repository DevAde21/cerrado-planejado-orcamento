// #region Base

document.addEventListener('DOMContentLoaded', function () {
    // Menu de Navegação para Media Query 2
    const menuToggle = document.querySelector('.secondary-menu-toggle');
    const secondaryMenu = document.createElement('div'); // Cria o menu secundário
    secondaryMenu.classList.add('secondary-menu');
    document.body.appendChild(secondaryMenu); // Adiciona o menu ao body

    // Cria a lista de itens do menu secundário
    const menuItems = `
        <ul>
            <li><a href="../../index.html#inicio" class="active">Tela Inicial</a></li>
            <li><a href="../../index.html#produtos">Ambientes</a></li>
            <li><a href="../../index.html#processo">Etapas do processo</a></li>
            <li><a href="../../index.html#escolher">Por que nos escolher</a></li>
            <li><a href="../html/about_us.html">Sobre nós</a></li>
        </ul>
        <div class="secondary-menu-contacts">
            <a href="https://www.instagram.com/cerradoplanejado/" target="_blank" rel="noopener noreferrer">
                <img class="secondary-menu-contacts-icon" src="assets/instagram2.png" alt="Instagram">
            </a>
            <a href="https://wa.me/+5561981002114" target="_blank" rel="noopener noreferrer">
                <img class="secondary-menu-contacts-icon" src="assets/whatsapp2.png" alt="WhatsApp">
            </a>
            <a href="mailto:contato@cerradoplanejado.com.br">
                <img class="secondary-menu-contacts-icon" src="assets/email2.png" alt="E-mail">
            </a>
        </div>
    `;
    secondaryMenu.innerHTML = menuItems;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            secondaryMenu.classList.toggle('active'); // Abre/fecha o menu
            overlay.style.display = 'block'; //mostra o overlay
            document.body.classList.add('menu-active'); // Adiciona classe para prevenir scroll
        });
    }

    // Fecha o menu ao clicar fora dele
    if (overlay) {
        overlay.addEventListener('click', function () {
            secondaryMenu.classList.remove('active');
            overlay.style.display = 'none';
            document.body.classList.remove('menu-active'); // Remove classe para permitir scroll
        });
    }

    // Redireciona para a página principal (index.html) e ancora na seção
    const navLinks = document.querySelectorAll('.secondary-menu ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Impede o comportamento padrão do link

            const targetHref = this.getAttribute('href'); // Pega o href do link

            // Redireciona para index.html com a âncora
            window.location.href = targetHref;
        });
    });
});

// Função para desativar o efeito de seleção azul
function disableBlueHighlight() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent;
        }
    `;
    document.head.appendChild(style);
}

// Função para remover animações de hover em dispositivos sem cursor
function removeHoverAnimations() {
    if (!window.matchMedia('(pointer: fine)').matches) {
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            .header-contacts button:hover, .secondary-menu-icon:hover {
                transform: none !important;
                background-color: inherit !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Executar as funções ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    disableBlueHighlight();
    removeHoverAnimations();
});

// #endregion

// #region Valores dos elementos
const elementValues = {
    moveis: {
        cozinha: {
            "Móvel 1": 100,
            "Móvel 2": 150,
            "Móvel 3": 120,
            "Móvel 4": 180,
            "Móvel 5": 90,
            "Móvel 6": 200
        },
        sala: {
            "Móvel 1": 250,
            "Móvel 2": 180,
            "Móvel 3": 300,
            "Móvel 4": 220,
            "Móvel 5": 280,
            "Móvel 6": 200,
            "Móvel 7": 260,
            "Móvel 8": 230
        },
        quarto: {
            "Móvel 1": 180,
            "Móvel 2": 220,
            "Móvel 3": 150,
            "Móvel 4": 200
        },
        banheiro: {
            "Móvel 1": 80,
            "Móvel 2": 120,
            "Móvel 3": 100
        },
        varanda: {
            "Móvel 1": 130,
            "Móvel 2": 160,
            "Móvel 3": 110,
            "Móvel 4": 140,
            "Móvel 5": 100
        },
        escritorio: {
            "Móvel 1": 200,
            "Móvel 2": 150
        },
        closet: {
            "Móvel 1": 300
        },
        lavanderia: {
            "Móvel 1": 90,
            "Móvel 2": 110,
            "Móvel 3": 70
        }
    },
    unidades: {
        porta: 50,
        gaveta: 30
    },
    cores: {
        branco: 0, // Branco não adiciona valor
        outro: 20  // Outra cor adiciona um valor fixo
    },
    medidas: {
        altura: 0.5, // Valor por cm
        largura: 0.7, // Valor por cm
        comprimento: 0.6 // Valor por cm
    },
    acabamentos: {
        essencial: 100,
        intermediario: 200,
        premium: 300
    }
};

// #endregion

// #region Sistema de Etapas do Orçamento

// **1. Limpeza do localStorage no início**
// Limpa o localStorage ao carregar a página para garantir um novo orçamento
localStorage.clear();

// Variáveis de controle das etapas
let currentStep = 1; // Etapa atual
const totalSteps = 7; // Número total de etapas (1, 2, 3, 4, 5, 6, 7)
let moveisSelecionados = []; // Array para armazenar os móveis selecionados
let movelAtualIndex = 0; // Índice do móvel atual nas etapas 4 e 5

// Função para atualizar a exibição da etapa
function updateStepDisplay() {
    const contentContainer = document.querySelector('.container-wrapper .content-container'); 
    contentContainer.innerHTML = ''; // Limpa o conteúdo atual

    // Define a visibilidade do subtítulo com base na etapa atual
    const isSubtitleVisible = currentStep === 3;

    switch (currentStep) {
        case 1:
            createStep1Content(contentContainer, isSubtitleVisible);
            break;
        case 2:
            createStep2Content(contentContainer, isSubtitleVisible);
            break;
        case 3:
            createStep3Content(contentContainer, isSubtitleVisible);
            break;
        case 4:
            createStep4Content(contentContainer, isSubtitleVisible);
            break;
        case 5:
            createStep5Content(contentContainer, isSubtitleVisible);
            break;
        case 6:
            createStep6Content(contentContainer, isSubtitleVisible);
            break;
         case 7:
            createStep7Content(contentContainer, isSubtitleVisible);
            break;
        default:
            console.error("Etapa inválida.");
            break;
    }

    // Adiciona o event listener aos inputs após a criação do conteúdo
    if (currentStep === 4 || currentStep === 5 || currentStep === 6) {
       setupInputMasks(contentContainer);
       setupRadioEvents(contentContainer);
    }
  // Atualiza o debug visual após cada etapa, aqui, a função é chamada por último.
    updateDebugInfo();

}

// Função do botão "Próximo"
function setupNextButton() {
    const contentContainer = document.querySelector('.container-wrapper .content-container');
    const nextButton = document.createElement('button');
    
    if (currentStep === 6) {
       nextButton.textContent = 'Enviar Orçamento'; // Texto do botão para a etapa 6
   } else if (currentStep === 7){
       nextButton.textContent = 'Voltar ao inicio'; // Texto do botão para a etapa 7
   } else{
        nextButton.textContent = 'Próximo'; // Texto padrão para outras etapas
    }

    nextButton.classList.add('next-button');

    nextButton.addEventListener('click', () => {
       if (currentStep === 1) {
            // Etapa 1: Validar cômodo selecionado
            if (!localStorage.getItem('comodoSelecionado')) {
                alert('Por favor, selecione um cômodo.');
                return;
            }
            currentStep = 2;
        }
        else if(currentStep === 2)
            {   //Etapa 2: validar o plano selecionado
              if(!localStorage.getItem('planoSelecionado'))
                 {
                      alert('Por favor, selecione um plano de acabamento.');
                     return;
                }
            currentStep = 3;
            }
        else if (currentStep === 3) {
            // Etapa 3: Armazenar os móveis selecionados e ir para a etapa 4
            moveisSelecionados = JSON.parse(localStorage.getItem('moveisSelecionados') || '[]');
            if (moveisSelecionados.length === 0) {
                alert('Selecione pelo menos um móvel.');
                return;
            }
            movelAtualIndex = 0; // Inicia o índice do móvel atual
            currentStep = 4; // Vai para a etapa 4
        }  else if (currentStep === 4) {
            // Etapa 4: Salvar altura, largura, comprimento e cor no localStorage
    const altura = document.getElementById('altura').value;
    const largura = document.getElementById('largura').value;
    const comprimento = document.getElementById('comprimento').value;
    const corBranco = document.getElementById('branco');
    const corOutro = document.getElementById('outro');
    const cor = corBranco.checked ? 'branco' : corOutro.checked ? 'outro' : null;

    // Salvar os valores no localStorage
    localStorage.setItem(`altura_movel_${movelAtualIndex}`, altura);
    localStorage.setItem(`largura_movel_${movelAtualIndex}`, largura);
    localStorage.setItem(`comprimento_movel_${movelAtualIndex}`, comprimento);
    localStorage.setItem(`cor_movel_${movelAtualIndex}`, cor);
           // Etapa 4: Validar dados
            

            if (!altura) {
             alert('Por favor, preencha a altura.');
              return;
            }
             if (!largura) {
                 alert('Por favor, preencha a largura.');
                return;
              }
            if (!comprimento) {
                  alert('Por favor, preencha o comprimento.');
                 return;
             }

              if (!corBranco.checked && !corOutro.checked) {
                   alert('Por favor, selecione a cor do móvel.');
                  return;
               }

           currentStep = 5;
       } else if (currentStep === 5) {
         // Etapa 5: Validar se os campos da etapa foram preenchidos corretamente
          const gavetaSimRadio = document.querySelector('#gaveta_sim');
          const gavetaNaoRadio = document.querySelector('#gaveta_nao');
          const numGavetasInput = document.querySelector('#num_gavetas');

           const portasSimRadio = document.querySelector('#portas_sim');
            const portasNaoRadio = document.querySelector('#portas_nao');
           const numPortasInput = document.querySelector('#num_portas');

         if (!gavetaSimRadio.checked && !gavetaNaoRadio.checked) {
                alert('Por favor, selecione se o móvel possui gavetas.');
                 return;
             }
         if (gavetaSimRadio.checked && !numGavetasInput.value) {
               alert('Por favor, especifique o número de gavetas.');
               return;
          }

             if (!portasSimRadio.checked && !portasNaoRadio.checked) {
                  alert('Por favor, selecione se o móvel possui portas.');
                    return;
             }

         if (portasSimRadio.checked && !numPortasInput.value) {
             alert('Por favor, especifique o número de portas.');
              return;
            }
        // Etapa 5: Salvar quantidade de gavetas e portas no localStorage
        const numGavetas = gavetaSimRadio.checked ? document.getElementById('num_gavetas').value : 0;
        const numPortas = portasSimRadio.checked ? document.getElementById('num_portas').value : 0;

        // Salvar os valores no localStorage
        localStorage.setItem(`num_gavetas_movel_${movelAtualIndex}`, numGavetas);
        localStorage.setItem(`num_portas_movel_${movelAtualIndex}`, numPortas);

            // Etapa 5: Verifica se há mais móveis para detalhar
            if (movelAtualIndex < moveisSelecionados.length - 1) {
                // Ainda há móveis para detalhar, avança para o próximo móvel e volta para a etapa 4
                movelAtualIndex++;
                currentStep = 4;
                
           }else{
             // Todos os móveis foram detalhados, avança para a etapa 6
               currentStep = 6;
            }
         }else if(currentStep === 6){
           // Etapa 6: Validação do formulário
           const nome = document.getElementById('nome').value;
           const email = document.getElementById('email').value;
           const telefone = document.getElementById('telefone').value;
   
           if (!nome) {
               alert('Por favor, insira seu nome.');
               return;
           }
           if (!email) {
                alert('Por favor, insira seu e-mail.');
               return;
           }
           if (!telefone || telefone.replace(/\D/g, '').length !== 11) {
             alert('Por favor, insira um telefone válido com 11 dígitos.');
                return;
             }

           currentStep = 7;
            // Aqui você pode adicionar a lógica para enviar os dados do orçamento, por exemplo:
             //  alert('Orçamento finalizado! Implemente a lógica de envio aqui.');
          }
         else if(currentStep === 7){
          //**2. Limpeza do localStorage ao pressionar "Voltar ao início"**
          localStorage.clear();
          currentStep = 1;
         }else {
            // Para as outras etapas, apenas incrementa o currentStep
            currentStep++;
        }

        // Se currentStep exceder o totalSteps, volta para a etapa 1
        if (currentStep > totalSteps) {
            currentStep = 1;
        }

        updateStepDisplay();
        
    });

    // Inserir o botão dentro do content-container, antes do final
    contentContainer.appendChild(nextButton);
}

// Inicializa a exibição da etapa 1
updateStepDisplay();

// #endregion

// #region Inputs Masks
function setupInputMasks(container) {
        const alturaInput = container.querySelector('#altura');
        const larguraInput = container.querySelector('#largura');
        const comprimentoInput = container.querySelector('#comprimento');
        const telefoneInput = container.querySelector('#telefone');
        const numGavetasInput = container.querySelector('#num_gavetas');
        const numPortasInput = container.querySelector('#num_portas');
    
    if (alturaInput) {
       alturaInput.addEventListener('input', () => {
            alturaInput.value = formatMeasure(alturaInput.value);
        });
        }
    if (larguraInput) {
       larguraInput.addEventListener('input', () => {
            larguraInput.value = formatMeasure(larguraInput.value);
        });
        }
    if (comprimentoInput) {
       comprimentoInput.addEventListener('input', () => {
            comprimentoInput.value = formatMeasure(comprimentoInput.value);
        });
        }
    if (telefoneInput) {
            telefoneInput.addEventListener('input', () => {
              telefoneInput.value = formatPhone(telefoneInput.value);
        });
     }
     if (numGavetasInput) {
          numGavetasInput.addEventListener('input', () => {
               numGavetasInput.value = formatNumber(numGavetasInput.value);
          });
      }
    if (numPortasInput) {
            numPortasInput.addEventListener('input', () => {
                numPortasInput.value = formatNumber(numPortasInput.value);
            });
        }
}
//função para aceitar apenas numeros e virgula, retornando o numero formatado.
function formatMeasure(value) {
   const numericValue = value.replace(/[^0-9,]/g, '');
    return numericValue;
}
// Função para formatar o número de telefone
function formatPhone(value) {
     let numericValue = value.replace(/\D/g, '');
      numericValue = numericValue.slice(0,11); //limita em 11 digitos
   // Formata o telefone
        let formatted = numericValue;
    if(numericValue.length > 0)
       {
            formatted = `(${numericValue.slice(0,2)})`;
           if(numericValue.length > 2){
              formatted += ` ${numericValue.slice(2,7)}-`
                if (numericValue.length > 7){
                 formatted += `${numericValue.slice(7, 11)}`;
             } 
         }
       }

    return formatted;
 }
 
function formatNumber(value) {
      const numericValue = value.replace(/\D/g, '');
       return numericValue;
    }
// #endregion

// #region Radio Events
function setupRadioEvents(container) {
    // Etapa 5
    const gavetaSimRadio = container.querySelector('#gaveta_sim');
    const gavetaNaoRadio = container.querySelector('#gaveta_nao');
    const numGavetasInput = container.querySelector('#num_gavetas');

    const portasSimRadio = container.querySelector('#portas_sim');
    const portasNaoRadio = container.querySelector('#portas_nao');
    const numPortasInput = container.querySelector('#num_portas');

    // Função para desabilitar/habilitar campos de texto com base nas seleções dos radio buttons
    function toggleInputState(radioSim, radioNao, input) {
            if (radioNao && radioNao.checked) {
               input.value = "";
                input.disabled = true;
              input.style.cursor = 'not-allowed';
            } else {
               input.disabled = false;
                 input.style.cursor = 'auto';
           }
      }

         if (numGavetasInput && gavetaSimRadio && gavetaNaoRadio) {
           
        // Listener para input de gavetas quando clicado (se "não" não estiver marcado, marca "sim" automaticamente)
               numGavetasInput.addEventListener('focus', function () {
               if (!gavetaNaoRadio.checked && !gavetaSimRadio.checked) {
                 gavetaSimRadio.checked = true;
                   toggleInputState(gavetaSimRadio, gavetaNaoRadio, numGavetasInput);
                }
            });
        // Listener para radio buttons gaveta
           gavetaSimRadio.addEventListener('change', function () {
                 toggleInputState(gavetaSimRadio, gavetaNaoRadio, numGavetasInput);
             });

             gavetaNaoRadio.addEventListener('change', function () {
                   toggleInputState(gavetaSimRadio, gavetaNaoRadio, numGavetasInput);
             });
            // Inicializa o estado do input
                toggleInputState(gavetaSimRadio, gavetaNaoRadio, numGavetasInput);
        }
       if (numPortasInput && portasSimRadio && portasNaoRadio) {

          // Listener para input de portas quando clicado (se "não" não estiver marcado, marca "sim" automaticamente)
              numPortasInput.addEventListener('focus', function () {
                  if (!portasNaoRadio.checked && !portasSimRadio.checked) {
                    portasSimRadio.checked = true;
                        toggleInputState(portasSimRadio, portasNaoRadio, numPortasInput);
                    }
               });
            // Listener para radio buttons portas
               portasSimRadio.addEventListener('change', function () {
                     toggleInputState(portasSimRadio, portasNaoRadio, numPortasInput);
                });

                portasNaoRadio.addEventListener('change', function () {
                    toggleInputState(portasSimRadio, portasNaoRadio, numPortasInput);
                 });
                // Inicializa o estado do input
              toggleInputState(portasSimRadio, portasNaoRadio, numPortasInput);
       }
}
// #endregion

// #region Etapas do Orçamento

// Etapa 1 - "Escolha o cômodo"
function createStep1Content(container, isSubtitleVisible) {
    container.innerHTML = `
        <div class="content-container-title1">
            Escolha o cômodo:
        </div>
        <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
            Subtítulo
        </div>
        <div class="S1-grid-container">
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="cozinha">
                    <img src="assets/ambientes/cozinha.webp" alt="Cozinha" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Cozinha</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="sala">
                    <img src="assets/ambientes/sala.webp" alt="Sala" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Sala</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="quarto">
                    <img src="assets/ambientes/quarto.webp" alt="Quarto" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Quarto</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="banheiro">
                    <img src="assets/ambientes/banheiro.webp" alt="Banheiro" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Banheiro</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="varanda">
                    <img src="assets/ambientes/varanda.webp" alt="Varanda" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Varanda</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="escritorio">
                    <img src="assets/ambientes/escritorio.webp" alt="Escritório" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Escritório</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="closet">
                    <img src="assets/ambientes/closet.webp" alt="Closet" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Closet</p>
            </div>
            <div class="S1-grid-item">
                <div class="S1-square" data-comodo="lavanderia">
                    <img src="assets/ambientes/lavanderia.webp" alt="Lavanderia" class="S1-square-image">
                    <div class="S1-selection-layer"></div>
                </div>
                <p class="S1-square-text">Lavanderia</p>
            </div>
        </div>
    `;

    // Adiciona o event listener para a seleção dos quadrados após a criação do conteúdo
    const squares = container.querySelectorAll('.S1-square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            // Desmarca todos os quadrados
            document.querySelectorAll('.S1-selection-layer').forEach(layer => {
                layer.classList.remove('S1-selected');
            });

            // Marca o quadrado clicado
            const selectionLayer = square.querySelector('.S1-selection-layer');
            if (selectionLayer) {
                selectionLayer.classList.add('S1-selected');
            }

            // Armazena a seleção do cômodo na localStorage
            localStorage.setItem('comodoSelecionado', square.dataset.comodo);

            // Atualiza o debug visual
            updateDebugInfo();
        });
    });

    // Configura o botão "Próximo"
    setupNextButton();
}

// Etapa 2 - "Escolha o plano de acabamento"
function createStep2Content(container, isSubtitleVisible) {
    container.innerHTML = `
        <div class="content-container-title1">
            Escolha o plano de acabamento:
        </div>
        <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
            Subtítulo
        </div>
        <div class="S2-grid-container">
            <div class="S2-grid-item">
                <div class="S2-square" data-plano="essencial">
                    <div class="S2-plan-name">Essencial</div>
                    <div class="S2-selection-layer"></div>
                </div>
                
            </div>
            <div class="S2-grid-item">
                <div class="S2-square" data-plano="intermediario">
                    <div class="S2-plan-name">Intermediário</div>
                    <div class="S2-selection-layer"></div>
                </div>
                
            </div>
            <div class="S2-grid-item">
                <div class="S2-square" data-plano="premium">
                    <div class="S2-plan-name">Premium</div>
                    <div class="S2-selection-layer"></div>
                </div>
                
            </div>
        </div>
    `;

    // Adiciona o event listener para a seleção dos quadrados
    const squares = container.querySelectorAll('.S2-square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            // Desmarca todos os quadrados
            document.querySelectorAll('.S2-selection-layer').forEach(layer => {
                layer.classList.remove('S2-selected');
            });

            // Marca o quadrado clicado
            const selectionLayer = square.querySelector('.S2-selection-layer');
            if (selectionLayer) {
                selectionLayer.classList.add('S2-selected');
            }

            // Armazena a seleção do plano na localStorage
            localStorage.setItem('planoSelecionado', square.dataset.plano);

            // Atualiza o debug visual
            updateDebugInfo();
        });
    });

    // Configura o botão "Próximo"
    setupNextButton();
}

// Etapa 3 - "Escolha o móvel"
function createStep3Content(container, isSubtitleVisible) {
    const comodoSelecionado = localStorage.getItem('comodoSelecionado');
    let moveisDisponiveis;

    // Definição dos móveis por cômodo
    const moveisPorComodo = {
        cozinha: 6,
        sala: 8,
        quarto: 4,
        banheiro: 3,
        varanda: 5,
        escritorio: 2,
        closet: 1,
        lavanderia: 3
    };

    if (comodoSelecionado && moveisPorComodo[comodoSelecionado]) {
        moveisDisponiveis = moveisPorComodo[comodoSelecionado];
    } else {
        container.innerHTML = '<div class="error-message">Selecione um cômodo na etapa anterior.</div>';
        setupNextButton();
        return;
    }

    let gridContent = `
        <div class="content-container-title1">
            Escolha o móvel:
        </div>
        <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
            Pode escolher uma ou mais opções.
        </div>
        <div class="S3-grid-container">
    `;

    for (let i = 1; i <= moveisDisponiveis; i++) {
        gridContent += `
            <div class="S3-grid-item">
                <div class="S3-square" data-movel="Móvel ${i}">
                    <div class="S3-selection-layer"></div>
                </div>
                <p class="S3-square-text">Móvel ${i}</p>
            </div>
        `;
    }

    gridContent += `</div>`;
    container.innerHTML = gridContent;

    // Adiciona o event listener para a seleção múltipla dos quadrados na etapa 3
    const squares = container.querySelectorAll('.S3-square');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            const selectionLayer = square.querySelector('.S3-selection-layer');
            const movelSelecionado = square.dataset.movel;
            let moveisSelecionados = JSON.parse(localStorage.getItem('moveisSelecionados') || '[]');

            if (selectionLayer.classList.contains('S3-selected')) {
                // Desseleciona o móvel se já estiver selecionado
                selectionLayer.classList.remove('S3-selected');
                moveisSelecionados = moveisSelecionados.filter(m => m !== movelSelecionado);
            } else {
                // Seleciona o móvel
                selectionLayer.classList.add('S3-selected');
                moveisSelecionados.push(movelSelecionado);
            }

            // Atualiza a lista de móveis selecionados na localStorage
            localStorage.setItem('moveisSelecionados', JSON.stringify(moveisSelecionados));

            // Atualiza o debug visual
            updateDebugInfo();
        });
    });

    // Configura o botão "Próximo" para a etapa 3
    setupNextButton();
}

// Etapa 4 - "Forneça mais detalhes do móvel - Pt.1"
function createStep4Content(container, isSubtitleVisible) {
    const movelAtual = moveisSelecionados[movelAtualIndex];
    container.innerHTML = `
        <div class="content-container-title1">
            Forneça mais detalhes do móvel:
        </div>
        <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
            Aqui você pode adicionar campos de formulário, imagens, etc. (Parte 1)
        </div>
        <div class="S4-content">
            <div class="S4-movel-image-container">
                <div class="S4-movel-image"></div> <!-- Container para a imagem do móvel -->
                <p class="S4-movel-name">${movelAtual}</p>
            </div>
            <img src="assets/medidas.png" alt="Medidas" class="S4-medidas-image">
            <div class="S4-form-container">
                <p class="S4-form-title">Medidas:</p>
                <div class="S4-input-group">
                    <label for="altura">Altura:</label>
                    <div class="S4-input-with-unit">
                       <input type="text" id="altura" name="altura" class="S4-input" placeholder="0,0" autocomplete="off">
                       <span class="S4-unit">Cm</span>
                    </div>
                </div>
                <div class="S4-input-group">
                    <label for="largura">Largura:</label>
                    <div class="S4-input-with-unit">
                       <input type="text" id="largura" name="largura" class="S4-input" placeholder="0,0" autocomplete="off">
                       <span class="S4-unit">Cm</span>
                    </div>
                </div>
                <div class="S4-input-group">
                    <label for="comprimento">Comprimento:</label>
                    <div class="S4-input-with-unit">
                       <input type="text" id="comprimento" name="comprimento" class="S4-input" placeholder="0,0" autocomplete="off">
                       <span class="S4-unit">Cm</span>
                    </div>
                </div>
                <p class="S4-form-title S4-form-title-color">Cor:</p>
                <div class="S4-radio-group">
                    <input type="radio" id="branco" name="cor" value="branco" class="S4-radio">
                    <label for="branco">Branco</label>
                    <input type="radio" id="outro" name="cor" value="outro" class="S4-radio">
                    <label for="outro">Outro</label>
                </div>
            </div>
        </div>
    `;
  
  // Configura o botão "Próximo"
  setupNextButton();
}

// Etapa 5 - "Forneça mais detalhes do móvel - Pt.2"
function createStep5Content(container, isSubtitleVisible) {
    const movelAtual = moveisSelecionados[movelAtualIndex];
    container.innerHTML = `
        <div class="content-container-title1">
            Forneça mais detalhes do móvel:
        </div>
        <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
            Aqui você pode adicionar campos de formulário, imagens, etc. (Parte 2)
        </div>
        <div class="S5-content">
            <div class="S5-movel-image-container">
                <div class="S5-movel-image"></div> <!-- Container para a imagem do móvel -->
                <p class="S5-movel-name">${movelAtual}</p>
            </div>
            <div class="S5-form-container">
                <div class="S5-form-group">
                    <p class="S5-form-title-main">O móvel possui gavetas?</p>
                    <div class="S5-radio-group">
                        <input type="radio" id="gaveta_sim" name="gaveta" value="sim" class="S5-radio">
                        <label for="gaveta_sim">Sim</label>
                        <input type="radio" id="gaveta_nao" name="gaveta" value="nao" class="S5-radio">
                        <label for="gaveta_nao">Não</label>
                    </div>
                </div>
                 <div class="S5-input-group">
                    <label for="num_gavetas">Se sim, quantas:</label>
                    <input type="text" id="num_gavetas" name="num_gavetas" class="S5-input" disabled autocomplete="off">
                 </div>
                  <div class="S5-form-group">
                    <p class="S5-form-title-main">O móvel possui portas?</p>
                        <div class="S5-radio-group">
                            <input type="radio" id="portas_sim" name="portas" value="sim" class="S5-radio">
                            <label for="portas_sim">Sim</label>
                            <input type="radio" id="portas_nao" name="portas" value="nao" class="S5-radio">
                            <label for="portas_nao">Não</label>
                        </div>
                  </div>
                   <div class="S5-input-group">
                    <label for="num_portas">Se sim, quantas:</label>
                     <input type="text" id="num_portas" name="num_portas" class="S5-input" disabled autocomplete="off">
                </div>
            </div>
        </div>
    `;

    // Configura o botão "Próximo"
    setupNextButton();
}

// Etapa 6 - "Faça seu cadastro e receba o orçamento no seu e-mail"
function createStep6Content(container, isSubtitleVisible) {
    container.innerHTML = `
        <div class="content-container-title1">
            Faça seu cadastro e receba o orçamento no seu e-mail
        </div>
         <div class="content-container-title2" style="display: ${isSubtitleVisible ? 'block' : 'none'}">
           Informe seus dados abaixo:
         </div>
          <div class="S6-content">
                <div class="S6-form-container">
                    <div class="S6-input-group">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" class="S6-input" autocomplete="off">
                    </div>
                    <div class="S6-input-group">
                         <label for="email">E-mail:</label>
                         <input type="email" id="email" name="email" class="S6-input" autocomplete="off">
                     </div>
                    <div class="S6-input-group">
                        <label for="telefone">Telefone:</label>
                       <input type="tel" id="telefone" name="telefone" class="S6-input" autocomplete="off">
                    </div>
               </div>
            </div>
    `;
       // Configura o botão "Enviar Orçamento"
    setupNextButton();
}

// Etapa 7 - "Orçamento finalizado, verifique o e-mail cadastrado!"
function createStep7Content(container, isSubtitleVisible) {
    container.innerHTML = `
        <div class="S7-content">
            <p class="S7-final-text">Orçamento finalizado, verifique o e-mail cadastrado!</p>
        </div>
    `;

    // Configura o botão "Próximo"
    setupNextButton();
}

// #endregion

// #region Seção de Debug

// Função para atualizar as informações de debug visual
function updateDebugInfo() {
    let debugContainer = document.querySelector('#debug-info');
    if (!debugContainer) {
        debugContainer = document.createElement('div');
        debugContainer.id = 'debug-info';
        document.body.appendChild(debugContainer);
    }

    // Informações Gerais
    const comodoSelecionado = localStorage.getItem('comodoSelecionado') || 'Nenhum cômodo selecionado';
    const planoSelecionado = localStorage.getItem('planoSelecionado') || 'Nenhum plano selecionado';
    const moveis = JSON.parse(localStorage.getItem('moveisSelecionados') || '[]');
    const moveisArray = Array.isArray(moveis) ? moveis : [moveis];
    const valorAcabamento = elementValues.acabamentos[planoSelecionado] || 0;

    debugContainer.innerHTML = `
        <p class="section-title">INF. GERAIS:</p> 
        <p>Ambiente: ${comodoSelecionado}</p>
        <p>Acabamento: ${planoSelecionado}</p>
        <p>Móveis: ${moveisArray.join(', ') || 'Nenhum móvel selecionado'}</p>
        <p class="section-title">INF. ESPECÍFICAS:</p>
    `;

    // Informações Específicas (para cada móvel) e Calcula valor total
    let valorTotal = 0;
    valorTotal += valorAcabamento;

    moveisSelecionados.forEach((movel, index) => {
        const altura = localStorage.getItem(`altura_movel_${index}`) || 'N/A';
        const largura = localStorage.getItem(`largura_movel_${index}`) || 'N/A';
        const comprimento = localStorage.getItem(`comprimento_movel_${index}`) || 'N/A';
        const cor = localStorage.getItem(`cor_movel_${index}`) || 'N/A';
        const numGavetas = localStorage.getItem(`num_gavetas_movel_${index}`) || '0';
        const numPortas = localStorage.getItem(`num_portas_movel_${index}`) || '0';
        const valorMovel = calcularValorMovel(comodoSelecionado, movel, altura, largura, comprimento, cor, numGavetas, numPortas);
        valorTotal += valorMovel;

        debugContainer.innerHTML += `
            <div class="movel-info">
                <p>Móvel: ${movel}</p>
                <p>Altura: ${altura}</p>
                <p>Largura: ${largura}</p>
                <p>Comprimento: ${comprimento}</p>
                <p>Cor: ${cor}</p>
                <p>Qnt. Gavetas: ${numGavetas}</p>
                <p>Qnt. Portas: ${numPortas}</p>
                <p>Valor do Móvel: R$ ${valorMovel.toFixed(2)}</p>
            </div>
        `;
    });

    debugContainer.innerHTML += `<p style="margin-top: 10px;">Valor Total: R$ ${valorTotal.toFixed(2)}</p>`;
}

function calcularValorMovel(comodo, movel, altura, largura, comprimento, cor, numGavetas, numPortas) {
    let valor = 0;

    // Valor base do móvel
    if (elementValues.moveis[comodo] && elementValues.moveis[comodo][movel]) {
        valor += elementValues.moveis[comodo][movel];
    }

    // Adiciona valor baseado nas medidas
    valor += altura * elementValues.medidas.altura;
    valor += largura * elementValues.medidas.largura;
    valor += comprimento * elementValues.medidas.comprimento;

    // Adiciona valor baseado na cor
    if (cor === 'outro') {
        valor += elementValues.cores.outro;
    }

    // Adiciona valor baseado na quantidade de gavetas e portas
    valor += parseInt(numGavetas) * elementValues.unidades.gaveta;
    valor += parseInt(numPortas) * elementValues.unidades.porta;

    return valor;
}

// #endregion















