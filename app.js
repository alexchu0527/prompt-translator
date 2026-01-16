const { useState } = React;

const ArrowRight = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' }), React.createElement('polyline', { points: '12 5 19 12 12 19' }));
const Copy = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2' }), React.createElement('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }));
const Check = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('polyline', { points: '20 6 9 17 4 12' }));
const MessageCircle = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' }));
const Sparkles = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('path', { d: 'M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z' }), React.createElement('path', { d: 'M19 12l.75 2.25L22 15l-2.25.75L19 18l-.75-2.25L16 15l2.25-.75L19 12z' }));
const AlertCircle = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('line', { x1: '12', y1: '8', x2: '12', y2: '12' }), React.createElement('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' }));
const RefreshCw = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('polyline', { points: '23 4 23 10 17 10' }), React.createElement('polyline', { points: '1 20 1 14 7 14' }), React.createElement('path', { d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' }));
const History = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('circle', { cx: '12', cy: '12', r: '10' }), React.createElement('polyline', { points: '12 6 12 12 16 14' }));
const GitBranch = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('line', { x1: '6', y1: '3', x2: '6', y2: '15' }), React.createElement('circle', { cx: '18', cy: '6', r: '3' }), React.createElement('circle', { cx: '6', cy: '18', r: '3' }), React.createElement('path', { d: 'M18 9a9 9 0 0 1-9 9' }));
const RotateCcw = ({ size = 24 }) => React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '2' }, React.createElement('polyline', { points: '1 4 1 10 7 10' }), React.createElement('path', { d: 'M3.51 15a9 9 0 1 0 2.13-9.36L1 10' }));

function PromptTranslator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showQA, setShowQA] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [correctionInput, setCorrectionInput] = useState('');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [versionHistory, setVersionHistory] = useState([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);
  const analyzeAndAskQuestions = async () => {
    if (!input.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `你是一个专业的提示词工程师。用户输入了一个通俗的需求描述，为了生成高质量的提示词，你需要识别缺失的关键信息。

用户输入：
${input}

请分析这个需求，并提出2-4个关键问题来补充信息。这些问题应该帮助明确：
- 具体的输出格式或结构
- 内容的风格、语气或受众
- 具体的约束条件或要求
- 任何可能导致歧义的细节

请直接以JSON格式输出问题列表，不要有任何其他文字：
[
  "问题1",
  "问题2",
  "问题3"
]`
          }]
        })
      });
      const data = await response.json();
      const text = data.content.filter(item => item.type === 'text').map(item => item.text).join('\n').replace(/```json|```/g, '').trim();
      const questionList = JSON.parse(text);
      setQuestions(questionList.map(q => ({ question: q, answer: '' })));
      setShowQA(true);
    } catch (error) {
      alert('分析失败，将直接翻译: ' + error.message);
      translatePrompt();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updateAnswer = (index, answer) => {
    const newQuestions = [...questions];
    newQuestions[index].answer = answer;
    setQuestions(newQuestions);
  };

  const translatePrompt = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      let contextInfo = '';
      if (questions.length > 0) {
        contextInfo = '\n\n补充信息：\n' + questions.filter(q => q.answer.trim()).map(q => `Q: ${q.question}\nA: ${q.answer}`).join('\n\n');
      }
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `你是一个专业的AI提示词工程师。请将下面的通俗语言转换为结构化、清晰、具体的大模型提示词。

要求：
1. 保持原意，但使用更精确的表达
2. 添加必要的结构和约束条件
3. 明确输出格式和要求
4. 避免模糊表达，减少幻觉风险
5. 使用XML标签或markdown格式组织内容（如适用）
6. 充分利用补充信息来完善提示词
7. 直接输出优化后的提示词，不要有任何解释或前言

用户输入的通俗语言：
${input}${contextInfo}

请直接输出优化后的提示词：`
          }]
        })
      });
      const data = await response.json();
      const translatedText = data.content.filter(item => item.type === 'text').map(item => item.text).join('\n');
      const newVersion = {
        content: translatedText,
        timestamp: new Date().toLocaleString('zh-CN'),
        action: '初始翻译',
        input: input,
        questionAnswers: questions.filter(q => q.answer.trim())
      };
      setVersionHistory([newVersion]);
      setCurrentVersionIndex(0);
      setOutput(translatedText);
      setShowCorrection(true);
    } catch (error) {
      setOutput('翻译失败，请重试。错误: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCorrection = async () => {
    if (!correctionInput.trim() || !output) return;
    setIsCorrecting(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `你是一个专业的提示词优化专家。用户对当前生成的提示词提出了纠正意见，请根据反馈进行优化。

原始提示词：
${output}

用户的纠正反馈：
${correctionInput}

请根据反馈修改提示词，注意：
1. 准确理解用户的纠正意图
2. 保留原提示词中正确的部分
3. 针对性地修正指出的问题
4. 保持结构化和清晰性
5. 直接输出修正后的提示词，不要有任何解释或前言

请直接输出修正后的提示词：`
          }]
        })
      });
      if (!response.ok) throw new Error(`API请求失败: ${response.status}`);
      const data = await response.json();
      if (!data.content || data.content.length === 0) throw new Error('API返回数据为空');
      const correctedText = data.content.filter(item => item.type === 'text').map(item => item.text).join('\n');
      if (!correctedText.trim()) throw new Error('生成的纠正内容为空'
      const newVersion = {
        content: correctedText,
        timestamp: new Date().toLocaleString('zh-CN'),
        action: '优化纠正',
        feedback: correctionInput,
        previousVersion: currentVersionIndex
      };
      const newHistory = [...versionHistory.slice(0, currentVersionIndex + 1), newVersion];
      setVersionHistory(newHistory);
      setCurrentVersionIndex(newHistory.length - 1);
      setOutput(correctedText);
      setCorrectionInput('');
    } catch (error) {
      alert('纠正失败: ' + error.message);
    } finally {
      setIsCorrecting(false);
    }
  };

  const revertToVersion = (index) => {
    if (index >= 0 && index < versionHistory.length) {
      setCurrentVersionIndex(index);
      setOutput(versionHistory[index].content);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }; 
return React.createElement('div', { className: 'min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6' },
    React.createElement('div', { className: 'max-w-7xl mx-auto' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('h1', { className: 'text-3xl font-bold text-slate-800 mb-2' }, '智能提示词翻译工具'),
        React.createElement('p', { className: 'text-slate-600' }, '通过智能提问与迭代纠正提升prompt质量')
      ),
      React.createElement('div', { className: 'grid lg:grid-cols-3 gap-6' },
        React.createElement('div', { className: 'lg:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200 p-6' },
          React.createElement('h2', { className: 'text-lg font-semibold text-slate-700 mb-3' }, '输入端'),
          React.createElement('textarea', { value: input, onChange: (e) => setInput(e.target.value), placeholder: '在这里输入通俗的描述，例如：\n\n帮我写一篇关于人工智能的文章，要求有趣易懂...', className: 'w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400' }),
          React.createElement('div', { className: 'mt-4 space-y-2' },
            React.createElement('button', { onClick: analyzeAndAskQuestions, disabled: !input.trim() || isAnalyzing || isLoading, className: 'w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2' },
              isAnalyzing ? React.createElement(React.Fragment, null, React.createElement('div', { className: 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' }), '分析中...') : React.createElement(React.Fragment, null, React.createElement(Sparkles, { size: 18 }), '智能翻译（推荐）')
            ),
            React.createElement('button', { onClick: () => { setQuestions([]); setShowQA(false); translatePrompt(); }, disabled: !input.trim() || isAnalyzing || isLoading, className: 'w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-300 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2' }, '直接翻译', React.createElement(ArrowRight, { size: 16 }))
          )
        ),
        showQA && React.createElement('div', { className: 'lg:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200 p-6' },
          React.createElement('div', { className: 'flex items-center gap-2 mb-3' }, React.createElement(MessageCircle, { size: 20, className: 'text-blue-600' }), React.createElement('h2', { className: 'text-lg font-semibold text-slate-700' }, '补充信息')),
          React.createElement('p', { className: 'text-sm text-slate-600 mb-4' }, '回答这些问题以生成更精确的提示词'),
          React.createElement('div', { className: 'space-y-4 mb-4 max-h-96 overflow-y-auto' }, questions.map((q, index) => React.createElement('div', { key: index, className: 'border border-slate-200 rounded-lg p-4 bg-slate-50' }, React.createElement('div', { className: 'flex items-start gap-2 mb-2' }, React.createElement('span', { className: 'flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold' }, index + 1), React.createElement('p', { className: 'text-sm font-medium text-slate-700' }, q.question)), React.createElement('textarea', { value: q.answer, onChange: (e) => updateAnswer(index, e.target.value), placeholder: '输入你的回答...', className: 'w-full h-20 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm text-slate-700' })))),
          React.createElement('button', { onClick: translatePrompt, disabled: isLoading, className: 'w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2' }, isLoading ? React.createElement(React.Fragment, null, React.createElement('div', { className: 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' }), '生成中...') : React.createElement(React.Fragment, null, '生成优化提示词', React.createElement(ArrowRight, { size: 18 })))
        ),
        React.createElement('div', { className: `${showQA ? 'lg:col-span-1' : 'lg:col-span-2'} bg-white rounded-lg shadow-sm border border-slate-200 p-6` },
          React.createElement('div', { className: 'flex items-center justify-between mb-3' },
            React.createElement('div', { className: 'flex items-center gap-3' }, React.createElement('h2', { className: 'text-lg font-semibold text-slate-700' }, '输出端'), versionHistory.length > 0 && React.createElement('span', { className: 'text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium' }, `V${currentVersionIndex + 1}/${versionHistory.length}`)),
            React.createElement('div', { className: 'flex gap-2' }, versionHistory.length > 1 && React.createElement('button', { onClick: () => setShowHistory(!showHistory), className: `flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors ${showHistory ? 'bg-purple-600 text-white' : 'text-purple-600 hover:bg-purple-50 border border-purple-200'}` }, React.createElement(History, { size: 16 }), showHistory ? '隐藏历史' : '版本历史'), output && React.createElement('button', { onClick: copyToClipboard, className: 'flex items-center gap-1 text-sm text-slate-600 hover:text-blue-600 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50' }, copied ? React.createElement(React.Fragment, null, React.createElement(Check, { size: 16 }), '已复制') : React.createElement(React.Fragment, null, React.createElement(Copy, { size: 16 }), '复制')))
          ),
          showHistory && versionHistory.length > 0 && React.createElement('div', { className: 'mb-4 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 shadow-sm' },
            React.createElement('div', { className: 'flex items-center gap-2 mb-4' }, React.createElement(GitBranch, { size: 20, className: 'text-purple-600' }), React.createElement('h3', { className: 'text-base font-bold text-purple-900' }, '提示词演化树'), React.createElement('span', { className: 'text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full' }, '点击任意版本即可回退')),
            React.createElement('div', { className: 'space-y-0' }, versionHistory.map((version, index) => React.createElement('div', { key: index, className: 'relative' }, index < versionHistory.length - 1 && React.createElement('div', { className: 'absolute left-6 top-12 w-0.5 h-12 bg-gradient-to-b from-purple-400 to-purple-300' }), React.createElement('div', { onClick: () => revertToVersion(index), className: `relative flex items-start gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${index === currentVersionIndex ? 'bg-white border-purple-500 shadow-md transform scale-[1.02]' : 'bg-white/50 border-purple-200 hover:bg-white hover:border-purple-400 hover:shadow'}` }, React.createElement('div', { className: 'flex-shrink-0 flex flex-col items-center' }, React.createElement('div', { className: `w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${index === currentVersionIndex ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white ring-4 ring-purple-200' : 'bg-gradient-to-br from-purple-400 to-indigo-400 text-white'}` }, `V${index + 1}`)), React.createElement('div', { className: 'flex-1 min-w-0' }, React.createElement('div', { className: 'flex items-center gap-2 mb-2' }, React.createElement('span', { className: 'text-base font-bold text-purple-900' }, version.action), index === currentVersionIndex && React.createElement('span', { className: 'text-xs bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full font-semibold shadow' }, '当前版本')), React.createElement('p', { className: 'text-sm text-slate-600 mb-2 flex items-center gap-2' }, React.createElement('span', { className: 'text-purple-500' }, '🕐'), version.timestamp), version.feedback && React.createElement('div', { className: 'mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200' }, React.createElement('p', { className: 'text-xs font-semibold text-amber-900 mb-1' }, '优化反馈：'), React.createElement('p', { className: 'text-xs text-amber-800' }, version.feedback)), index !== currentVersionIndex && React.createElement('button', { onClick: (e) => { e.stopPropagation(); revertToVersion(index); }, className: 'mt-3 inline-flex items-center gap-2 text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 py-2 rounded-lg font-medium shadow-sm transition-all' }, React.createElement(RotateCcw, { size: 14 }), '回退到此版本')))))
            ))
          ),
          React.createElement('div', { className: `w-full p-4 border border-slate-300 rounded-lg bg-slate-50 overflow-auto ${showQA ? 'h-80' : showHistory ? 'h-96' : 'h-[32rem]'}` }, output ? React.createElement('pre', { className: 'text-slate-700 whitespace-pre-wrap text-sm font-mono leading-relaxed' }, output) : React.createElement('div', { className: 'flex items-center justify-center h-full' }, React.createElement('p', { className: 'text-slate-400 text-sm' }, '优化后的提示词将显示在这里...')))
        )
      ),
      showCorrection && output && React.createElement('div', { className: 'mt-6 bg-white rounded-lg shadow-sm border border-orange-200 p-6' },
        React.createElement('div', { className: 'flex items-center gap-3 mb-4' }, React.createElement(AlertCircle, { size: 22, className: 'text-orange-600' }), React.createElement('h2', { className: 'text-lg font-semibold text-slate-700' }, '继续优化'), React.createElement('span', { className: 'text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium' }, '支持连续纠正')),
        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4' },
          React.createElement('div', { className: 'md:col-span-2' }, React.createElement('label', { className: 'block text-sm font-medium text-slate-700 mb-2' }, '描述需要优化的方向'), React.createElement('textarea', { value: correctionInput, onChange: (e) => setCorrectionInput(e.target.value), placeholder: '例如：\n• 输出格式应该是JSON而不是Markdown\n• 语气需要更专业严谨\n• 增加关于错误处理的说明\n• 字数要求调整为800-1000字', className: 'w-full h-32 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none text-slate-700 placeholder-slate-400' }), React.createElement('p', { className: 'text-xs text-slate-500 mt-1' }, `共 ${correctionInput.length} 字`)),
          React.createElement('div', { className: 'flex flex-col justify-end gap-2' }, React.createElement('button', { onClick: handleCorrection, disabled: !correctionInput.trim() || isCorrecting, className: 'w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm' }, isCorrecting ? React.createElement(React.Fragment, null, React.createElement('div', { className: 'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' }), '优化中...') : React.createElement(React.Fragment, null, React.createElement(RefreshCw, { size: 18 }), '应用优化')), React.createElement('p', { className: 'text-xs text-center text-slate-500' }, '优化后将创建新版本 V' + (versionHistory.length + 1)))
        )
      ),
      React.createElement('div', { className: 'mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6' },
        React.createElement('h3', { className: 'text-base font-bold text-blue-900 mb-3 flex items-center gap-2' }, '✨ 新功能说明'),
        React.createElement('div', { className: 'grid md:grid-cols-3 gap-4 text-sm text-blue-800' },
          React.createElement('div', { className: 'flex gap-3' }, React.createElement('span', { className: 'text-2xl' }, '🔄'), React.createElement('div', null, React.createElement('strong', { className: 'block mb-1' }, '连续优化'), '支持多次纠正，每次优化都会创建新版本，形成完整的优化链路')),
          React.createElement('div', { className: 'flex gap-3' }, React.createElement('span', { className: 'text-2xl' }, '🌳'), React.createElement('div', null, React.createElement('strong', { className: 'block mb-1' }, '演化树状图'), '可视化显示所有版本的演化过程，清晰展示每次优化的改进点')),
          React.createElement('div', { className: 'flex gap-3' }, React.createElement('span', { className: 'text-2xl' }, '⏮️'), React.createElement('div', null, React.createElement('strong', { className: 'block mb-1' }, '版本回退'), '一键回退到任意历史版本，随时恢复到之前满意的状态'))
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(PromptTranslator));
