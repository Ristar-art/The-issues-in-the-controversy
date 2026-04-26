/**
 * Sanitize Quill-specific HTML into standard HTML.
 */
// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
export function sanitizeQuillHtml(html) {
  if (stryMutAct_9fa48("0")) {
    {}
  } else {
    stryCov_9fa48("0");
    if (stryMutAct_9fa48("3") ? false : stryMutAct_9fa48("2") ? true : stryMutAct_9fa48("1") ? html : (stryCov_9fa48("1", "2", "3"), !html)) return stryMutAct_9fa48("4") ? "Stryker was here!" : (stryCov_9fa48("4"), '');
    html = html.replace(stryMutAct_9fa48("8") ? /<span\s+class="ql-ui"[>]*><\/span>/g : stryMutAct_9fa48("7") ? /<span\s+class="ql-ui"[^>]><\/span>/g : stryMutAct_9fa48("6") ? /<span\S+class="ql-ui"[^>]*><\/span>/g : stryMutAct_9fa48("5") ? /<span\sclass="ql-ui"[^>]*><\/span>/g : (stryCov_9fa48("5", "6", "7", "8"), /<span\s+class="ql-ui"[^>]*><\/span>/g), stryMutAct_9fa48("9") ? "Stryker was here!" : (stryCov_9fa48("9"), ''));
    html = html.replace(stryMutAct_9fa48("11") ? /\S+contenteditable="false"/g : stryMutAct_9fa48("10") ? /\scontenteditable="false"/g : (stryCov_9fa48("10", "11"), /\s+contenteditable="false"/g), stryMutAct_9fa48("12") ? "Stryker was here!" : (stryCov_9fa48("12"), ''));
    html = html.replace(stryMutAct_9fa48("16") ? /<ol>([\s\s]*?)<\/ol>/g : stryMutAct_9fa48("15") ? /<ol>([\S\S]*?)<\/ol>/g : stryMutAct_9fa48("14") ? /<ol>([^\s\S]*?)<\/ol>/g : stryMutAct_9fa48("13") ? /<ol>([\s\S])<\/ol>/g : (stryCov_9fa48("13", "14", "15", "16"), /<ol>([\s\S]*?)<\/ol>/g), (_, inner) => {
      if (stryMutAct_9fa48("17")) {
        {}
      } else {
        stryCov_9fa48("17");
        const liRegex = stryMutAct_9fa48("23") ? /<li([^>]*)>([\s\s]*?)<\/li>/g : stryMutAct_9fa48("22") ? /<li([^>]*)>([\S\S]*?)<\/li>/g : stryMutAct_9fa48("21") ? /<li([^>]*)>([^\s\S]*?)<\/li>/g : stryMutAct_9fa48("20") ? /<li([^>]*)>([\s\S])<\/li>/g : stryMutAct_9fa48("19") ? /<li([>]*)>([\s\S]*?)<\/li>/g : stryMutAct_9fa48("18") ? /<li([^>])>([\s\S]*?)<\/li>/g : (stryCov_9fa48("18", "19", "20", "21", "22", "23"), /<li([^>]*)>([\s\S]*?)<\/li>/g);
        const items = stryMutAct_9fa48("24") ? ["Stryker was here"] : (stryCov_9fa48("24"), []);
        let m;
        while (stryMutAct_9fa48("26") ? (m = liRegex.exec(inner)) === null : stryMutAct_9fa48("25") ? false : (stryCov_9fa48("25", "26"), (m = liRegex.exec(inner)) !== null)) {
          if (stryMutAct_9fa48("27")) {
            {}
          } else {
            stryCov_9fa48("27");
            const attrs = m[1];
            const content = m[2];
            const typeMatch = attrs.match(stryMutAct_9fa48("29") ? /data-list="(["]*)"/ : stryMutAct_9fa48("28") ? /data-list="([^"])"/ : (stryCov_9fa48("28", "29"), /data-list="([^"]*)"/));
            const type = typeMatch ? typeMatch[1] : stryMutAct_9fa48("30") ? "" : (stryCov_9fa48("30"), 'ordered');
            const cleanAttrs = attrs.replace(stryMutAct_9fa48("34") ? /\s*data-list="["]*"/ : stryMutAct_9fa48("33") ? /\s*data-list="[^"]"/ : stryMutAct_9fa48("32") ? /\S*data-list="[^"]*"/ : stryMutAct_9fa48("31") ? /\sdata-list="[^"]*"/ : (stryCov_9fa48("31", "32", "33", "34"), /\s*data-list="[^"]*"/), stryMutAct_9fa48("35") ? "Stryker was here!" : (stryCov_9fa48("35"), ''));
            items.push(stryMutAct_9fa48("36") ? {} : (stryCov_9fa48("36"), {
              type,
              html: stryMutAct_9fa48("37") ? `` : (stryCov_9fa48("37"), `<li${cleanAttrs}>${content}</li>`)
            }));
          }
        }
        let result = stryMutAct_9fa48("38") ? "Stryker was here!" : (stryCov_9fa48("38"), '');
        let i = 0;
        while (stryMutAct_9fa48("41") ? i >= items.length : stryMutAct_9fa48("40") ? i <= items.length : stryMutAct_9fa48("39") ? false : (stryCov_9fa48("39", "40", "41"), i < items.length)) {
          if (stryMutAct_9fa48("42")) {
            {}
          } else {
            stryCov_9fa48("42");
            const currentType = items[i].type;
            const tag = (stryMutAct_9fa48("45") ? currentType !== 'bullet' : stryMutAct_9fa48("44") ? false : stryMutAct_9fa48("43") ? true : (stryCov_9fa48("43", "44", "45"), currentType === (stryMutAct_9fa48("46") ? "" : (stryCov_9fa48("46"), 'bullet')))) ? stryMutAct_9fa48("47") ? "" : (stryCov_9fa48("47"), 'ul') : stryMutAct_9fa48("48") ? "" : (stryCov_9fa48("48"), 'ol');
            result += stryMutAct_9fa48("49") ? `` : (stryCov_9fa48("49"), `<${tag}>`);
            while (stryMutAct_9fa48("51") ? i < items.length || items[i].type === currentType : stryMutAct_9fa48("50") ? false : (stryCov_9fa48("50", "51"), (stryMutAct_9fa48("54") ? i >= items.length : stryMutAct_9fa48("53") ? i <= items.length : stryMutAct_9fa48("52") ? true : (stryCov_9fa48("52", "53", "54"), i < items.length)) && (stryMutAct_9fa48("56") ? items[i].type !== currentType : stryMutAct_9fa48("55") ? true : (stryCov_9fa48("55", "56"), items[i].type === currentType)))) {
              if (stryMutAct_9fa48("57")) {
                {}
              } else {
                stryCov_9fa48("57");
                stryMutAct_9fa48("58") ? result -= items[i].html : (stryCov_9fa48("58"), result += items[i].html);
                stryMutAct_9fa48("59") ? i-- : (stryCov_9fa48("59"), i++);
              }
            }
            result += stryMutAct_9fa48("60") ? `` : (stryCov_9fa48("60"), `</${tag}>`);
          }
        }
        return result;
      }
    });
    html = html.replace(stryMutAct_9fa48("72") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<))/g : stryMutAct_9fa48("71") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\S*(?:<|$))/g : stryMutAct_9fa48("70") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s(?:<|$))/g : stryMutAct_9fa48("69") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?!\s*(?:<|$))/g : stryMutAct_9fa48("68") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\s]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("67") ? /<div\s+class="ql-code-block-container"[^>]*>([\S\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("66") ? /<div\s+class="ql-code-block-container"[^>]*>([^\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("65") ? /<div\s+class="ql-code-block-container"[^>]*>([\s\S])<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("64") ? /<div\s+class="ql-code-block-container"[>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("63") ? /<div\s+class="ql-code-block-container"[^>]>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("62") ? /<div\S+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : stryMutAct_9fa48("61") ? /<div\sclass="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g : (stryCov_9fa48("61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72"), /<div\s+class="ql-code-block-container"[^>]*>([\s\S]*?)<\/div>(?=\s*(?:<|$))/g), fullMatch => {
      if (stryMutAct_9fa48("73")) {
        {}
      } else {
        stryCov_9fa48("73");
        const lines = stryMutAct_9fa48("74") ? ["Stryker was here"] : (stryCov_9fa48("74"), []);
        const lineRegex = stryMutAct_9fa48("82") ? /<div\s+class="ql-code-block"[^>]*>([\s\s]*?)<\/div>/g : stryMutAct_9fa48("81") ? /<div\s+class="ql-code-block"[^>]*>([\S\S]*?)<\/div>/g : stryMutAct_9fa48("80") ? /<div\s+class="ql-code-block"[^>]*>([^\s\S]*?)<\/div>/g : stryMutAct_9fa48("79") ? /<div\s+class="ql-code-block"[^>]*>([\s\S])<\/div>/g : stryMutAct_9fa48("78") ? /<div\s+class="ql-code-block"[>]*>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("77") ? /<div\s+class="ql-code-block"[^>]>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("76") ? /<div\S+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g : stryMutAct_9fa48("75") ? /<div\sclass="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g : (stryCov_9fa48("75", "76", "77", "78", "79", "80", "81", "82"), /<div\s+class="ql-code-block"[^>]*>([\s\S]*?)<\/div>/g);
        let match;
        while (stryMutAct_9fa48("84") ? (match = lineRegex.exec(fullMatch)) === null : stryMutAct_9fa48("83") ? false : (stryCov_9fa48("83", "84"), (match = lineRegex.exec(fullMatch)) !== null)) {
          if (stryMutAct_9fa48("85")) {
            {}
          } else {
            stryCov_9fa48("85");
            lines.push(match[1]);
          }
        }
        return stryMutAct_9fa48("86") ? `` : (stryCov_9fa48("86"), `<pre><code>${lines.join(stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), '\n'))}</code></pre>`);
      }
    });
    return html;
  }
}

/**
 * Convert a blocks array into HTML, resolving component references.
 */
export function blocksToHtml(blocks, components) {
  if (stryMutAct_9fa48("88")) {
    {}
  } else {
    stryCov_9fa48("88");
    if (stryMutAct_9fa48("91") ? !blocks && !Array.isArray(blocks) : stryMutAct_9fa48("90") ? false : stryMutAct_9fa48("89") ? true : (stryCov_9fa48("89", "90", "91"), (stryMutAct_9fa48("92") ? blocks : (stryCov_9fa48("92"), !blocks)) || (stryMutAct_9fa48("93") ? Array.isArray(blocks) : (stryCov_9fa48("93"), !Array.isArray(blocks))))) return stryMutAct_9fa48("94") ? "Stryker was here!" : (stryCov_9fa48("94"), '');
    return blocks.map(block => {
      if (stryMutAct_9fa48("95")) {
        {}
      } else {
        stryCov_9fa48("95");
        switch (block.type) {
          case stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), 'heading'):
            if (stryMutAct_9fa48("96")) {} else {
              stryCov_9fa48("96");
              {
                if (stryMutAct_9fa48("98")) {
                  {}
                } else {
                  stryCov_9fa48("98");
                  const level = stryMutAct_9fa48("101") ? block.level && 2 : stryMutAct_9fa48("100") ? false : stryMutAct_9fa48("99") ? true : (stryCov_9fa48("99", "100", "101"), block.level || 2);
                  const tag = stryMutAct_9fa48("102") ? `` : (stryCov_9fa48("102"), `h${level}`);
                  return stryMutAct_9fa48("103") ? `` : (stryCov_9fa48("103"), `<${tag}>${stryMutAct_9fa48("106") ? block.text && '' : stryMutAct_9fa48("105") ? false : stryMutAct_9fa48("104") ? true : (stryCov_9fa48("104", "105", "106"), block.text || (stryMutAct_9fa48("107") ? "Stryker was here!" : (stryCov_9fa48("107"), '')))}</${tag}>`);
                }
              }
            }
          case stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), 'text'):
            if (stryMutAct_9fa48("108")) {} else {
              stryCov_9fa48("108");
              return sanitizeQuillHtml(stryMutAct_9fa48("112") ? block.text && '' : stryMutAct_9fa48("111") ? false : stryMutAct_9fa48("110") ? true : (stryCov_9fa48("110", "111", "112"), block.text || (stryMutAct_9fa48("113") ? "Stryker was here!" : (stryCov_9fa48("113"), ''))));
            }
          case stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), 'image'):
            if (stryMutAct_9fa48("114")) {} else {
              stryCov_9fa48("114");
              if (stryMutAct_9fa48("117") ? false : stryMutAct_9fa48("116") ? true : (stryCov_9fa48("116", "117"), block.src)) {
                if (stryMutAct_9fa48("118")) {
                  {}
                } else {
                  stryCov_9fa48("118");
                  const width = block.widthPercent ? stryMutAct_9fa48("119") ? `` : (stryCov_9fa48("119"), `width: ${block.widthPercent}%`) : stryMutAct_9fa48("120") ? "Stryker was here!" : (stryCov_9fa48("120"), '');
                  return stryMutAct_9fa48("121") ? `` : (stryCov_9fa48("121"), `<figure style="${width}"><img src="${block.src}" alt="${stryMutAct_9fa48("124") ? block.alt && '' : stryMutAct_9fa48("123") ? false : stryMutAct_9fa48("122") ? true : (stryCov_9fa48("122", "123", "124"), block.alt || (stryMutAct_9fa48("125") ? "Stryker was here!" : (stryCov_9fa48("125"), '')))}" style="max-width:100%" /></figure>`);
                }
              }
              return stryMutAct_9fa48("126") ? "Stryker was here!" : (stryCov_9fa48("126"), '');
            }
          case stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), 'button'):
            if (stryMutAct_9fa48("127")) {} else {
              stryCov_9fa48("127");
              if (stryMutAct_9fa48("130") ? false : stryMutAct_9fa48("129") ? true : (stryCov_9fa48("129", "130"), block.href)) {
                if (stryMutAct_9fa48("131")) {
                  {}
                } else {
                  stryCov_9fa48("131");
                  return stryMutAct_9fa48("132") ? `` : (stryCov_9fa48("132"), `<a href="${block.href}" class="button">${stryMutAct_9fa48("135") ? block.label && 'Button' : stryMutAct_9fa48("134") ? false : stryMutAct_9fa48("133") ? true : (stryCov_9fa48("133", "134", "135"), block.label || (stryMutAct_9fa48("136") ? "" : (stryCov_9fa48("136"), 'Button')))}</a>`);
                }
              }
              return stryMutAct_9fa48("137") ? "Stryker was here!" : (stryCov_9fa48("137"), '');
            }
          case stryMutAct_9fa48("139") ? "" : (stryCov_9fa48("139"), 'component'):
            if (stryMutAct_9fa48("138")) {} else {
              stryCov_9fa48("138");
              {
                if (stryMutAct_9fa48("140")) {
                  {}
                } else {
                  stryCov_9fa48("140");
                  if (stryMutAct_9fa48("143") ? block.componentId || components : stryMutAct_9fa48("142") ? false : stryMutAct_9fa48("141") ? true : (stryCov_9fa48("141", "142", "143"), block.componentId && components)) {
                    if (stryMutAct_9fa48("144")) {
                      {}
                    } else {
                      stryCov_9fa48("144");
                      const component = components.find(stryMutAct_9fa48("145") ? () => undefined : (stryCov_9fa48("145"), c => stryMutAct_9fa48("148") ? c.id !== block.componentId : stryMutAct_9fa48("147") ? false : stryMutAct_9fa48("146") ? true : (stryCov_9fa48("146", "147", "148"), c.id === block.componentId)));
                      if (stryMutAct_9fa48("150") ? false : stryMutAct_9fa48("149") ? true : (stryCov_9fa48("149", "150"), component)) {
                        if (stryMutAct_9fa48("151")) {
                          {}
                        } else {
                          stryCov_9fa48("151");
                          return component.html;
                        }
                      }
                    }
                  }
                  return stryMutAct_9fa48("152") ? "Stryker was here!" : (stryCov_9fa48("152"), '');
                }
              }
            }
          case stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), 'layout'):
            if (stryMutAct_9fa48("153")) {} else {
              stryCov_9fa48("153");
              if (stryMutAct_9fa48("156") ? false : stryMutAct_9fa48("155") ? true : (stryCov_9fa48("155", "156"), block.blocks)) {
                if (stryMutAct_9fa48("157")) {
                  {}
                } else {
                  stryCov_9fa48("157");
                  const cols = stryMutAct_9fa48("160") ? block.columns && 2 : stryMutAct_9fa48("159") ? false : stryMutAct_9fa48("158") ? true : (stryCov_9fa48("158", "159", "160"), block.columns || 2);
                  const inner = blocksToHtml(block.blocks, components);
                  return stryMutAct_9fa48("161") ? `` : (stryCov_9fa48("161"), `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:1rem">${inner}</div>`);
                }
              }
              return stryMutAct_9fa48("162") ? "Stryker was here!" : (stryCov_9fa48("162"), '');
            }
          default:
            if (stryMutAct_9fa48("163")) {} else {
              stryCov_9fa48("163");
              return sanitizeQuillHtml(stryMutAct_9fa48("166") ? block.text && '' : stryMutAct_9fa48("165") ? false : stryMutAct_9fa48("164") ? true : (stryCov_9fa48("164", "165", "166"), block.text || (stryMutAct_9fa48("167") ? "Stryker was here!" : (stryCov_9fa48("167"), ''))));
            }
        }
      }
    }).join(stryMutAct_9fa48("168") ? "" : (stryCov_9fa48("168"), '\n'));
  }
}