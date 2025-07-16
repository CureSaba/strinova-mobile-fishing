# strinova-mobile-fishing

Discord の釣りゲーム用自動化スクリプトです。

## 必要環境

- Node.js 16 以上
- Discord アカウント

## セットアップ手順

1. リポジトリをクローンします。

   ```sh
   git clone https://github.com/CureSaba/strinova-mobile-fishing.git
   cd strinova-mobile-fishing
   ```

2. 依存パッケージをインストールします。

   ```sh
   npm install
   ```

3. Discord トークンを取得し、`main.js` の `client.login('token');` の `'token'` 部分を書き換えてください。

### Discord トークンの取得方法

> ⚠️ 注意: トークンは絶対に公開しないでください。  
> トークンが漏洩するとアカウントを乗っ取られる危険性があります。

#### 推奨: 開発者ツールのコンソールから取得

1. デスクトップ版 Discord を開きます。
2. `Ctrl + Shift + I`（または`Cmd + Option + I`）で開発者ツールを開きます。
3. 「Console」タブに切り替え、下記のスクリプトを貼り付けて Enter を押します。

    ```js
    window.webpackChunkdiscord_app.push([
      [Symbol()],
      {},
      req => {
        if (!req.c) return;
        for (let m of Object.values(req.c)) {
          try {
            if (!m.exports || m.exports === window) continue;
            if (m.exports?.getToken) return copy(m.exports.getToken());
            for (let ex in m.exports) {
              if (m.exports?.[ex]?.getToken && m.exports[ex][Symbol.toStringTag] !== 'IntlMessagesProxy') return copy(m.exports[ex].getToken());
            }
          } catch {}
        }
      },
    ]);
    window.webpackChunkdiscord_app.pop();
    console.log('%cWorked!', 'font-size: 50px');
    console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');
    ```

4. 実行後、トークンが自動的にクリップボードへコピーされます。

5. コピーしたトークンを `main.js` の該当箇所に貼り付けてください。

例:
```js
client.login('ここにトークンを貼り付け');
```

---

## 実行方法

```sh
node main.js
```

---

## 注意事項

- 本スクリプトの使用により発生した損害等について、作者は一切責任を負いません。
- Discord 利用規約に反する可能性があるため、自己責任でご利用ください。

---

## ライセンス

MIT License
