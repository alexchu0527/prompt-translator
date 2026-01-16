export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.QWEN_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: 'qwen-plus',
        input: {
          messages: messages
        },
        parameters: {
          result_format: 'message'
        }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // 转换为兼容格式
    const formattedResponse = {
      content: [
        {
          type: 'text',
          text: data.output?.choices?.[0]?.message?.content || data.output?.text || ''
        }
      ]
    };

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
