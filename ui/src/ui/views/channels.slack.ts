import { html, nothing } from "lit";
import { t } from "../../i18n/index.ts";
import { formatRelativeTimestamp } from "../format.ts";
import type { SlackStatus } from "../types.ts";
import { renderChannelConfigSection } from "./channels.config.ts";
import type { ChannelsProps } from "./channels.types.ts";

export function renderSlackCard(params: {
  props: ChannelsProps;
  slack?: SlackStatus | null;
  accountCountLabel: unknown;
}) {
  const { props, slack, accountCountLabel } = params;

  return html`
    <div class="card">
      <div class="card-title">${t("channelsPage.slack.title")}</div>
      <div class="card-sub">${t("channelsPage.slack.subtitle")}</div>
      ${accountCountLabel}

      <div class="status-list" style="margin-top: 16px;">
        <div>
          <span class="label">${t("channelsPage.fields.configured")}</span>
          <span>${slack?.configured ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.running")}</span>
          <span>${slack?.running ? t("cron.summary.yes") : t("cron.summary.no")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastStart")}</span>
          <span>${slack?.lastStartAt ? formatRelativeTimestamp(slack.lastStartAt) : t("common.na")}</span>
        </div>
        <div>
          <span class="label">${t("channelsPage.fields.lastProbe")}</span>
          <span>${slack?.lastProbeAt ? formatRelativeTimestamp(slack.lastProbeAt) : t("common.na")}</span>
        </div>
      </div>

      ${
        slack?.lastError
          ? html`<div class="callout danger" style="margin-top: 12px;">
            ${slack.lastError}
          </div>`
          : nothing
      }

      ${
        slack?.probe
          ? html`<div class="callout" style="margin-top: 12px;">
            ${t("channelsPage.common.probe")} ${slack.probe.ok ? t("channelsPage.common.probeOk") : t("channelsPage.common.probeFailed")} ·
            ${slack.probe.status ?? ""} ${slack.probe.error ?? ""}
          </div>`
          : nothing
      }

      ${renderChannelConfigSection({ channelId: "slack", props })}

      <div class="row" style="margin-top: 12px;">
        <button class="btn" @click=${() => props.onRefresh(true)}>
          ${t("channelsPage.common.probe")}
        </button>
      </div>
    </div>
  `;
}
