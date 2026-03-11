import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { IMessageStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderIMessageCard(params: {
  props: ChannelsProps;
  imessage?: IMessageStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, imessage, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("channelsPage.imessage.title")}</div>
      <div class="card-sub">${t("channelsPage.imessage.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("channelsPage.fields.configured")}</span>
          <span>${imessage?.configured ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.running")}</span>
          <span>${imessage?.running ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastStart")}</span>
          <span>${imessage?.lastStartAt ? formatRelativeTimestamp(imessage.lastStartAt) : t("common.na")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastProbe")}</span>
          <span>${imessage?.lastProbeAt ? formatRelativeTimestamp(imessage.lastProbeAt) : t("common.na")}</span>
        </div>
      </div>

      ${
        imessage?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${imessage.lastError}
          </div>`
          : nothing
      }

      ${
        imessage?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            ${t("channelsPage.common.probe")} ${imessage.probe.ok ? t("channelsPage.common.probeOk") : t("channelsPage.common.probeFailed")} ·
            ${imessage.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "imessage", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${t("channelsPage.common.probe")}
        </button>
      </div>
    </div>
  `;
}
